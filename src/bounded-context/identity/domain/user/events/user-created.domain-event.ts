import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserCreatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserCreated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      name: string;
      username: string;
      avatarPath?: string;
      email?: string;
      phoneNumber?: string;
    },
  ) {
    super(aggregateId);
  }
}
