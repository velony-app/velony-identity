import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserAvatarPathUpdatedDomainEvent } from '@identity-domain/user/events/user-avatar-path-updated.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserAvatarPathUpdatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserAvatarPathUpdatedDomainEvent.Type)
  handle(event: UserAvatarPathUpdatedDomainEvent): void {
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
            avatar_path: event.props.avatarPath,
          },
        }),
      ),
    });
  }
}
