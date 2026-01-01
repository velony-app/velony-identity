export class LocalAuthenticationAlreadyExistsException extends Error {
  constructor() {
    super('Local authentication already exists');
    this.name = 'LocalAuthenticationAlreadyExistsException';
  }
}
