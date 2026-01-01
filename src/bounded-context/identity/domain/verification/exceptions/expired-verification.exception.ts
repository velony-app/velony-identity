export class ExpiredVerificationException extends Error {
  constructor() {
    super('Verification has expired');
    this.name = 'ExpiredVerificationException';
  }
}
