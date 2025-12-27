import { UnauthorizedException } from '@nestjs/common';

export class MissingRefreshTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Refresh token is missing',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'REFRESH_TOKEN_MISSING',
    });
  }
}
