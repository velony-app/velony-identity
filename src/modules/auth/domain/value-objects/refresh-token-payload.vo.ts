import { ValueObject } from 'src/shared/domain/base.vo';

type RefreshTokenPayloadProps = {
  sub: string;
};

export class RefreshTokenPayload extends ValueObject<RefreshTokenPayloadProps> {
  private constructor(value: RefreshTokenPayloadProps) {
    super(value);
  }

  public static create(value: RefreshTokenPayloadProps): RefreshTokenPayload {
    return new RefreshTokenPayload(value);
  }

  get sub(): string {
    return this.value.sub;
  }

  public equals(other: ValueObject<RefreshTokenPayloadProps>): boolean {
    return this.value.sub === other.value.sub;
  }
}
