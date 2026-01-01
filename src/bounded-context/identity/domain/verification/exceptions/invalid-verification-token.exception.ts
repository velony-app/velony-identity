export class InvalidVerificationTokenException extends Error {
  constructor() {
    super('Invalid verification token');
    this.name = 'InvalidVerificationTokenException';
  }
}
