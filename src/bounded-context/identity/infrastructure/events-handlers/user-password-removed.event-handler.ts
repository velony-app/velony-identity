import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserPasswordRemovedDomainEvent } from '@identity-domain/user/events/user-password-removed.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserPasswordRemovedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserPasswordRemovedDomainEvent.Type)
  handle(event: UserPasswordRemovedDomainEvent): void {
    this.kafkaService.client.emit('identity.user', {
      key: event.aggregateId,
      value: Buffer.from(
        JSON.stringify({
          meta: {
            event_id: event.id,
            event_type: event.type,
            occurred_at: event.occurredAt.toISOString(),
          },
          data: {},
        }),
      ),
    });
  }
}
