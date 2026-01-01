import { DomainEvent } from '@shared-kernel/libs/domain-event';
import { type AggregateId } from '@shared-kernel/libs/entity';

export class UserAvatarPathUpdatedDomainEvent extends DomainEvent {
  public static readonly Type = 'UserAvatarPathUpdated';

  constructor(
    aggregateId: AggregateId,
    public readonly props: {
      avatarPath: string;
    },
  ) {
    super(aggregateId);
  }
}
