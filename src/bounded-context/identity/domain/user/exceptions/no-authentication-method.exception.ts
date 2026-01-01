export class NoAuthenticationMethodException extends Error {
  constructor() {
    super('User must have at least one authentication method');
    this.name = 'NoAuthenticationMethodException';
  }
}
