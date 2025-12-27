import { DomainEvent } from 'src/shared/domain/base.domain-event';
import { type AggregateId } from 'src/shared/domain/base.entity';

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(
    userId: AggregateId,
    public readonly props: {
      name: string;
      username: string;
      avatarPath: string | null;
      email: string | null;
      phoneNumber: string | null;
    },
  ) {
    super(userId);
  }
}
