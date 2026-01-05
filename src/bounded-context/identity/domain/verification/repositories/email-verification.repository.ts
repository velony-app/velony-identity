import { UserId } from '@identity-domain/user/value-objects/user-id.vo';
import { type EmailVerificationEntity } from '@identity-domain/verification/aggregates/email-verification.entity';

export abstract class EmailVerificationRepository {
  public abstract findByUserId(
    userId: UserId,
  ): Promise<EmailVerificationEntity | null>;

  public abstract save(entity: EmailVerificationEntity): Promise<void>;
}
