import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserUsernameUpdatedDomainEvent } from '@identity-domain/user/events/user-username-updated.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserUsernameUpdatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserUsernameUpdatedDomainEvent.Type)
  handle(event: UserUsernameUpdatedDomainEvent): void {
    this.kafkaService.client.emit('identity.user', {
      key: event.aggregateId,
      value: Buffer.from(
        JSON.stringify({
          meta: {
            event_id: event.id,
            event_type: event.type,
            occurred_at: event.occurredAt.toISOString(),
          },
          data: {
            username: event.props.username,
          },
        }),
      ),
    });
  }
}
