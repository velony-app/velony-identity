import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class PhoneNumberVerificationRevokedDomainEvent extends DomainEvent {
  public static readonly Type = 'PhoneNumberVerificationRevoked';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      revokedAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
