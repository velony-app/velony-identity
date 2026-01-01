export class DuplicateEmailException extends Error {
  constructor(public readonly email: string) {
    super(`Email ${email} already exists`);
    this.name = 'DuplicateEmailException';
  }
}
