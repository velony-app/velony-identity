import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserPasswordUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserPasswordUpdated';

  constructor(aggregateId: AggregateId) {
    super(aggregateId, null);
  }
}
