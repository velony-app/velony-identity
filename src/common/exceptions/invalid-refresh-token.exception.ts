export class InvalidRefreshTokenException extends Error {
  constructor() {
    super('Refresh token is invalid');
    this.name = 'InvalidRefreshTokenException';
  }
}
