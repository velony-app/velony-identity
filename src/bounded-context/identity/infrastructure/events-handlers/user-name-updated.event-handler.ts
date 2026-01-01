import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserNameUpdatedDomainEvent } from '@identity-domain/user/events/user-name-updated.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserNameUpdatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserNameUpdatedDomainEvent.Type)
  handle(event: UserNameUpdatedDomainEvent): void {
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
            name: event.props.name,
          },
        }),
      ),
    });
  }
}
