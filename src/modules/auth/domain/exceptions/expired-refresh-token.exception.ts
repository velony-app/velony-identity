import { UnauthorizedException } from '@nestjs/common';

export class ExpiredRefreshTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Refresh token has expired',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'REFRESH_TOKEN_EXPIRED',
    });
  }
}
