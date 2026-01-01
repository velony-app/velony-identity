export class RevokedVerificationException extends Error {
  constructor() {
    super('Verification has been revoked');
    this.name = 'RevokedVerificationException';
  }
}
