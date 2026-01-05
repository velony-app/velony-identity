import { UserId } from '@identity-domain/user/value-objects/user-id.vo';
import { type PhoneNumberVerificationEntity } from '@identity-domain/verification/aggregates/phone-number-verification.entity';

export abstract class PhoneNumberVerificationRepository {
  public abstract findByUserId(
    userId: UserId,
  ): Promise<PhoneNumberVerificationEntity | null>;

  public abstract save(entity: PhoneNumberVerificationEntity): Promise<void>;
}
