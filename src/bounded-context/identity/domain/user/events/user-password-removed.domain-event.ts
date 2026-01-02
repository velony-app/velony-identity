import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserPasswordRemovedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserPasswordRemoved';

  constructor(aggregateId: AggregateId) {
    super(aggregateId, null);
  }
}
