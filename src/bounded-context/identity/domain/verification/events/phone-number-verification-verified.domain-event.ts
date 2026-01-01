import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class PhoneNumberVerificationVerifiedDomainEvent extends DomainEvent {
  public static readonly Type = 'PhoneNumberVerificationVerified';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      verifiedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
