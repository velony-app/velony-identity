import bcrypt from 'bcrypt';

import { ValueObject } from '@shared-kernel/libs/value-object';

import { type Password } from '@identity-domain/user/value-objects/password.vo';

export class PasswordHash extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(hash: string): PasswordHash {
    if (!/^\$2[aby]?\$/.test(hash)) {
      throw new Error('Invalid bcrypt hash format');
    }

    return new PasswordHash(hash);
  }

  public async verify(plain: Password): Promise<boolean> {
    try {
      return await bcrypt.compare(plain.value, this.value);
    } catch {
      return false;
    }
  }

  public equals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }
}
