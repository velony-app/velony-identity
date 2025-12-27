import { ValueObject } from 'src/shared/domain/base.vo';

type AccessTokenPayloadProps = {
  sub: string;
};

export class AccessTokenPayload extends ValueObject<AccessTokenPayloadProps> {
  private constructor(value: AccessTokenPayloadProps) {
    super(value);
  }

  public static create(value: AccessTokenPayloadProps): AccessTokenPayload {
    return new AccessTokenPayload(value);
  }

  get sub(): string {
    return this.value.sub;
  }

  public equals(other: ValueObject<AccessTokenPayloadProps>): boolean {
    return this.value.sub === other.value.sub;
  }
}
