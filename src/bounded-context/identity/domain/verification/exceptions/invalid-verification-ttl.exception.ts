export class InvalidVerificationTtlException extends Error {
  constructor() {
    super('Invalid verification TTL. Must be greater than 0');
    this.name = 'InvalidVerificationTtlException';
  }
}
