import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserEmailUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserEmailUpdated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      email: string;
    },
  ) {
    super(aggregateId);
  }
}
