export class VerificationNotFoundException extends Error {
  constructor() {
    super('Verification not found');
    this.name = 'VerificationNotFoundException';
  }
}
