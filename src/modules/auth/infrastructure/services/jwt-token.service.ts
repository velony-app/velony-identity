import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypedConfigService } from 'src/config/typed-config.service';
import { convertTime } from 'src/shared/utils/time.util';

import { ExpiredAccessTokenException } from '../../domain/exceptions/expired-access-token.exception';
import { ExpiredRefreshTokenException } from '../../domain/exceptions/expired-refresh-token.exception';
import { InvalidAccessTokenException } from '../../domain/exceptions/invalid-access-token.exception';
import { InvalidRefreshTokenException } from '../../domain/exceptions/invalid-refresh-token.exception';
import { TokenService } from '../../domain/services/token.service';
import { AccessTokenPayload } from '../../domain/value-objects/access-token-payload.vo';
import { RefreshTokenPayload } from '../../domain/value-objects/refresh-token-payload.vo';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly jwtService: JwtService,
  ) {}

  generateAccessToken(payload: AccessTokenPayload): string {
    const expiration = this.configService.get('JWT_ACCESS_EXPIRATION');
    const secret = this.configService.get('JWT_ACCESS_SECRET');

    return this.jwtService.sign(payload.value, {
      expiresIn: convertTime(expiration).seconds,
      secret: secret,
    });
  }

  generateRefreshToken(payload: RefreshTokenPayload): string {
    const expiration = this.configService.get('JWT_REFRESH_EXPIRATION');
    const secret = this.configService.get('JWT_REFRESH_SECRET');

    return this.jwtService.sign(payload.value, {
      expiresIn: convertTime(expiration).seconds,
      secret: secret,
    });
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const secret = this.configService.get('JWT_ACCESS_SECRET');

    try {
      return this.jwtService.verify(token, {
        secret: secret,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ExpiredAccessTokenException();
      }
      throw new InvalidAccessTokenException();
    }
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const secret = this.configService.get('JWT_REFRESH_SECRET');

    try {
      return this.jwtService.verify(token, {
        secret: secret,
      });
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new ExpiredRefreshTokenException();
      }
      throw new InvalidRefreshTokenException();
    }
  }
}
