import { UnauthorizedException } from '@nestjs/common';

export class MissingAccessTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Access token is missing',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'ACCESS_TOKEN_MISSING',
    });
  }
}
