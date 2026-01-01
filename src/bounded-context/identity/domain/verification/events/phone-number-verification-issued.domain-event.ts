import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class PhoneNumberVerificationIssuedDomainEvent extends DomainEvent {
  public static readonly Type = 'PhoneNumberVerificationIssued';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      userId: AggregateId;
      token: string;
      value: string;
      issuedAt: Date;
      expiresAt: Date;
    },
  ) {
    super(aggregateId);
  }
}
