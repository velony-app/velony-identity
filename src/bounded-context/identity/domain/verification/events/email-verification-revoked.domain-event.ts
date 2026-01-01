import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class EmailVerificationRevokedDomainEvent extends DomainEvent {
  public static readonly Type = 'EmailVerificationRevoked';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      revokedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
