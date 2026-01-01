export class InvalidUsernameOrPasswordException extends Error {
  constructor() {
    super('Invalid username or password');
    this.name = 'InvalidUsernameOrPasswordException';
  }
}
