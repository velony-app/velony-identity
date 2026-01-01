import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { UserPhoneNumberUpdatedDomainEvent } from '@identity-domain/user/events/user-phone-number-updated.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class UserPhoneNumberUpdatedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(UserPhoneNumberUpdatedDomainEvent.Type)
  handle(event: UserPhoneNumberUpdatedDomainEvent): void {
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
            phone_number: event.props.phoneNumber,
          },
        }),
      ),
    });
  }
}
