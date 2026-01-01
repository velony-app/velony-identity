import { Injectable } from '@nestjs/common';
import { type ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { ExpiredAccessTokenException } from '@common/exceptions/expired-access-token.exception';
import { InvalidAccessTokenException } from '@common/exceptions/invalid-access-token.exception';
import { MissingAccessTokenException } from '@common/exceptions/missing-access-token.exception';
import { type AuthenticatedUser } from '@common/strategies/jwt-cookie.strategy';

@Injectable()
export class JwtCookieAuthGuard extends AuthGuard('jwt-cookie') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = AuthenticatedUser>(
    error: Error | null,
    user: TUser | false,
    info: Error | undefined,
  ): TUser {
    if (info?.message === 'No auth token') {
      throw new MissingAccessTokenException();
    }

    if (info instanceof TokenExpiredError) {
      throw new ExpiredAccessTokenException();
    }

    if (info instanceof JsonWebTokenError) {
      throw new InvalidAccessTokenException();
    }

    if (error || !user) {
      throw new InvalidAccessTokenException();
    }

    return user;
  }
}
