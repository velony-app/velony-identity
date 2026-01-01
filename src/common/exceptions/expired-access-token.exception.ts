export class ExpiredAccessTokenException extends Error {
  constructor() {
    super('Access token has expired');
    this.name = 'ExpiredAccessTokenException';
  }
}
