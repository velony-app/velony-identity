import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { type Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { TypedConfigService } from '@config/typed-config.service';

export interface JwtPayload {
  sub: string;
}

export interface AuthenticatedUser {
  id: string;
}

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  'jwt-cookie',
) {
  constructor(private readonly configService: TypedConfigService) {
    const secret = configService.get('JWT_ACCESS_SECRET');

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.access_token,
      ]),
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    return { id: payload.sub };
  }
}
