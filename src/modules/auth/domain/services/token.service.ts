import { AccessTokenPayload } from '../value-objects/access-token-payload.vo';
import { RefreshTokenPayload } from '../value-objects/refresh-token-payload.vo';

export abstract class TokenService {
  abstract generateAccessToken(payload: AccessTokenPayload): string;

  abstract generateRefreshToken(payload: RefreshTokenPayload): string;

  abstract verifyAccessToken(token: string): AccessTokenPayload;

  abstract verifyRefreshToken(token: string): RefreshTokenPayload;
}
