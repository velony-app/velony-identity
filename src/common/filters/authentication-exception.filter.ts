import { Catch, HttpStatus } from '@nestjs/common';
import { type ArgumentsHost, type ExceptionFilter } from '@nestjs/common';
import { type Response } from 'express';

import { ExpiredAccessTokenException } from '@common/exceptions/expired-access-token.exception';
import { ExpiredRefreshTokenException } from '@common/exceptions/expired-refresh-token.exception';
import { InvalidAccessTokenException } from '@common/exceptions/invalid-access-token.exception';
import { InvalidRefreshTokenException } from '@common/exceptions/invalid-refresh-token.exception';
import { MissingAccessTokenException } from '@common/exceptions/missing-access-token.exception';
import { MissingRefreshTokenException } from '@common/exceptions/missing-refresh-token.exception';

@Catch(
  ExpiredAccessTokenException,
  ExpiredRefreshTokenException,
  InvalidAccessTokenException,
  InvalidRefreshTokenException,
  MissingAccessTokenException,
  MissingRefreshTokenException,
)
export class AuthExceptionFilter implements ExceptionFilter {
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
    if (exception instanceof ExpiredAccessTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'ACCESS_TOKEN_EXPIRED',
      };
    }

    if (exception instanceof ExpiredRefreshTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'REFRESH_TOKEN_EXPIRED',
      };
    }

    if (exception instanceof InvalidAccessTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'ACCESS_TOKEN_INVALID',
      };
    }

    if (exception instanceof InvalidRefreshTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'REFRESH_TOKEN_INVALID',
      };
    }

    if (exception instanceof MissingAccessTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'ACCESS_TOKEN_MISSING',
      };
    }

    if (exception instanceof MissingRefreshTokenException) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        errorCode: 'REFRESH_TOKEN_MISSING',
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
