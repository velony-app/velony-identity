export class ExpiredRefreshTokenException extends Error {
  constructor() {
    super('Refresh token has expired');
    this.name = 'ExpiredRefreshTokenException';
  }
}
