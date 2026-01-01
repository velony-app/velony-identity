export interface AccessTokenPayload {
  sub: string;
}

export interface RefreshTokenPayload {
  sub: string;
}

export abstract class TokenService {
  abstract generateAccessToken(payload: AccessTokenPayload): string;

  abstract generateRefreshToken(payload: RefreshTokenPayload): string;

  abstract verifyAccessToken(token: string): AccessTokenPayload;

  abstract verifyRefreshToken(token: string): RefreshTokenPayload;
}
