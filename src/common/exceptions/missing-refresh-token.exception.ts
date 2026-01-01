export class MissingRefreshTokenException extends Error {
  constructor() {
    super('Refresh token is missing');
    this.name = 'MissingRefreshTokenException';
  }
}
