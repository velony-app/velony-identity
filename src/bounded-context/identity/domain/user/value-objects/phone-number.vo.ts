import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { type CountryCode, type NationalNumber } from 'libphonenumber-js';

import { ValueObject } from '@shared-kernel/libs/value-object';

export class PhoneNumber extends ValueObject<string> {
  private readonly parsed: ReturnType<typeof parsePhoneNumberWithError>;

  private constructor(
    value: string,
    parsed: ReturnType<typeof parsePhoneNumberWithError>,
  ) {
    super(value);
    this.parsed = parsed;
  }

  public static create(value: string): PhoneNumber {
    if (!value.startsWith('+')) {
      throw new Error('Phone number must start with +');
    }

    const parsed = parsePhoneNumberWithError(value);

    if (!parsed || !parsed.isValid()) {
      throw new Error('Invalid phone number');
    }
    if (!parsed.country) {
      throw new Error('Could not determine country from phone number');
    }

    return new PhoneNumber(value, parsed);
  }

  public get countryCode(): CountryCode {
    return this.parsed.country!;
  }

  public get number(): NationalNumber {
    return this.parsed.nationalNumber;
  }

  public equals(other: ValueObject<string>): boolean {
    return this.value === other.value;
  }
}
