export class InvalidAccessTokenException extends Error {
  constructor() {
    super('Access token is invalid');
    this.name = 'InvalidAccessTokenException';
  }
}
