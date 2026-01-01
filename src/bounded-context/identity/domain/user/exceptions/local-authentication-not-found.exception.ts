export class LocalAuthenticationNotFoundException extends Error {
  constructor() {
    super('Local authentication not found');
    this.name = 'LocalAuthenticationNotFoundException';
  }
}
