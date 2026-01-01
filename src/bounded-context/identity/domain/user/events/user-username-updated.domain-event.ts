import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserUsernameUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserUsernameUpdated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      username: string;
    },
  ) {
    super(aggregateId);
  }
}
