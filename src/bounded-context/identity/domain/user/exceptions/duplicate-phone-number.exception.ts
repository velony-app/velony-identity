export class DuplicatePhoneNumberException extends Error {
  constructor(public readonly phoneNumber: string) {
    super(`Phone number ${phoneNumber} already exists`);
    this.name = 'DuplicatePhoneNumberException';
  }
}
