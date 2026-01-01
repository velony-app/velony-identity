export class MissingAccessTokenException extends Error {
  constructor() {
    super('Access token is missing');
    this.name = 'MissingAccessTokenException';
  }
}
