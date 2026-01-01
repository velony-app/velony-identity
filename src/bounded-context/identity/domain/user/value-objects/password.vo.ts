import bcrypt from 'bcrypt';

import { ValueObject } from '@shared-kernel/libs/value-object';

import { PasswordHash } from '@identity-domain/user/value-objects/password-hash.vo';

export class Password extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Password {
    if (value.length < 8) {
      throw new Error('Password must be at least 8 characters');
    }
    if (value.length > 100) {
      throw new Error('Password must be at most 100 characters');
    }
    if (!/[A-Z]/.test(value)) {
      throw new Error('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(value)) {
      throw new Error('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(value)) {
      throw new Error('Password must contain at least one number');
    }
    if (!/[^a-zA-Z0-9]/.test(value)) {
      throw new Error('Password must contain at least one symbol');
    }
    return new Password(value);
  }

  public async toHash(): Promise<PasswordHash> {
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(this.value, saltRounds);

    return PasswordHash.create(passwordHash);
  }

  public equals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }
}
