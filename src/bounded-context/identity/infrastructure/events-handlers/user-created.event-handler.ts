import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserCreatedDomainEvent } from '@identity-domain/user/events/user-created.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserCreatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserCreatedDomainEvent.Type)
  handle(event: UserCreatedDomainEvent): void {
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
            username: event.props.username,
            avatar_path: event.props.avatarPath,
            email: event.props.email,
            phone_number: event.props.phoneNumber,
          },
        }),
      ),
    });
  }
}
