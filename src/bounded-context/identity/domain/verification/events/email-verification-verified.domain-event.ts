import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class EmailVerificationVerifiedDomainEvent extends DomainEvent {
  public static readonly Type = 'EmailVerificationVerified';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      verifiedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
