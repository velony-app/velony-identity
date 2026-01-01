import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserEmailUpdatedDomainEvent } from '@identity-domain/user/events/user-email-updated.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserEmailUpdatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserEmailUpdatedDomainEvent.Type)
  handle(event: UserEmailUpdatedDomainEvent): void {
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
            email: event.props.email,
          },
        }),
      ),
    });
  }
}
