import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserNameUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserNameUpdated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      name: string;
    },
  ) {
    super(aggregateId);
  }
}
