import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserPhoneNumberUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserPhoneNumberUpdated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      phoneNumber: string;
    },
  ) {
    super(aggregateId);
  }
}
