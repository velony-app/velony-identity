import { UnauthorizedException } from '@nestjs/common';

export class ExpiredAccessTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Access token has expired',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'ACCESS_TOKEN_EXPIRED',
    });
  }
}
