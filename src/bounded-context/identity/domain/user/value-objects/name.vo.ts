import { ValueObject } from '@shared-kernel/libs/value-object';

export class Name extends ValueObject<string> {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Name {
    return new Name(value);
  }

  public equals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }
}
