import { UnauthorizedException } from '@nestjs/common';

export class UnauthenticatedException extends UnauthorizedException {
  constructor(message?: string) {
    super({
      message: message ?? 'Authentication required',
      statusCode: 401,
      error: 'Unauthorized',
      errorCode: 'UNAUTHENTICATED',
    });
  }
}
