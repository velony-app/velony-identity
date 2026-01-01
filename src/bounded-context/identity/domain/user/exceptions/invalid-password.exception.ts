export class InvalidPasswordException extends Error {
  constructor() {
    super('Invalid password');
    this.name = 'InvalidPasswordException';
  }
}
