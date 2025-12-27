import { UnauthorizedException } from '@nestjs/common';

export class InvalidAccessTokenException extends UnauthorizedException {
  constructor() {
    super({
      message: 'Access token is invalid',
      error: 'Unauthorized',
      statusCode: 401,
      errorCode: 'ACCESS_TOKEN_INVALID',
    });
  }
}
