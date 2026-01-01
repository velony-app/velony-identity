export class AlreadyVerifiedException extends Error {
  constructor() {
    super('Verification has already been used');
    this.name = 'AlreadyVerifiedException';
  }
}
