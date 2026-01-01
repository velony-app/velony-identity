import { Catch, HttpStatus } from '@nestjs/common';
import { type ArgumentsHost, type ExceptionFilter } from '@nestjs/common';
import { type Response } from 'express';

import { AlreadyVerifiedException } from '@identity-domain/verification/exceptions/already-verified.exception';
import { ExpiredVerificationException } from '@identity-domain/verification/exceptions/expired-verification.exception';
import { InvalidVerificationTokenException } from '@identity-domain/verification/exceptions/invalid-verification-token.exception';
import { InvalidVerificationTtlException } from '@identity-domain/verification/exceptions/invalid-verification-ttl.exception';
import { RevokedVerificationException } from '@identity-domain/verification/exceptions/revoked-verification.exception';
import { VerificationNotFoundException } from '@identity-domain/verification/exceptions/verification-not-found.exception';

@Catch(
  AlreadyVerifiedException,
  ExpiredVerificationException,
  InvalidVerificationTokenException,
  InvalidVerificationTtlException,
  RevokedVerificationException,
  VerificationNotFoundException,
)
export class VerificationExceptionFilter implements ExceptionFilter {
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
    if (exception instanceof AlreadyVerifiedException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'ALREADY_VERIFIED',
      };
    }

    if (exception instanceof ExpiredVerificationException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'VERIFICATION_EXPIRED',
      };
    }

    if (exception instanceof InvalidVerificationTokenException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'INVALID_VERIFICATION_TOKEN',
      };
    }

    if (exception instanceof InvalidVerificationTtlException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'INVALID_VERIFICATION_TTL',
      };
    }

    if (exception instanceof RevokedVerificationException) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        errorCode: 'VERIFICATION_REVOKED',
      };
    }

    if (exception instanceof VerificationNotFoundException) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        errorCode: 'VERIFICATION_NOT_FOUND',
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
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      default:
        return 'Error';
    }
  }
}
