export class DuplicateUsernameException extends Error {
  constructor(public readonly username: string) {
    super(`Username ${username} already exists`);
    this.name = 'DuplicateUsernameException';
  }
}
