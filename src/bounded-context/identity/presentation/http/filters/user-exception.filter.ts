import { Catch, HttpStatus } from '@nestjs/common';
import { type ArgumentsHost, type ExceptionFilter } from '@nestjs/common';
import { type Response } from 'express';

import { InvalidUsernameOrPasswordException } from '@identity-application/exceptions/invalid-username-or-password.exception';
import { DuplicateEmailException } from '@identity-domain/user/exceptions/duplicate-email.exception';
import { DuplicatePhoneNumberException } from '@identity-domain/user/exceptions/duplicate-phone-number.exception';
import { DuplicateUsernameException } from '@identity-domain/user/exceptions/duplicate-username.exception';
import { NoAuthenticationMethodException } from '@identity-domain/user/exceptions/no-authentication-method.exception';
import { UserNotFoundException } from '@identity-domain/user/exceptions/user-not-found.exception';

@Catch(
  DuplicateEmailException,
  DuplicatePhoneNumberException,
  DuplicateUsernameException,
  NoAuthenticationMethodException,
  UserNotFoundException,
  InvalidUsernameOrPasswordException,
)
export class UserExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { statusCode, errorCode } =
      this.mapExceptionToHttpResponse(exception);

    response.status(statusCode).json({
      message: exception.message,
      error: this.getErrorName(statusCode),
      statusCode,
      errorCode,
      timestamp: new Date().toISOString(),
    });
  }

  private mapExceptionToHttpResponse(exception: Error): {
    statusCode: number;
    errorCode: string;
  } {
    if (exception instanceof DuplicateEmailException) {
      return { statusCode: HttpStatus.CONFLICT, errorCode: 'DUPLICATE_EMAIL' };
    }

    if (exception instanceof DuplicatePhoneNumberException) {
      return {
        statusCode: HttpStatus.CONFLICT,
        errorCode: 'DUPLICATE_PHONE_NUMBER',
      };
    }

    if (exception instanceof DuplicateUsernameException) {
      return {
        statusCode: HttpStatus.CONFLICT,
        errorCode: 'DUPLICATE_USERNAME',
      };
    }

    if (exception instanceof NoAuthenticationMethodException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'NO_AUTHENTICATION_METHOD',
      };
    }

    if (exception instanceof UserNotFoundException) {
      return { statusCode: HttpStatus.NOT_FOUND, errorCode: 'USER_NOT_FOUND' };
    }

    if (exception instanceof InvalidUsernameOrPasswordException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'INVALID_USERNAME_OR_PASSWORD',
      };
    }

    return {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      errorCode: 'INTERNAL_ERROR',
    };
  }

  private getErrorName(statusCode: number): string {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      default:
        return 'Error';
    }
  }
}
