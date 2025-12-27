import { UnauthorizedException } from '@nestjs/common';

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Refresh token is invalid',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'REFRESH_TOKEN_INVALID',
    });
  }
}
