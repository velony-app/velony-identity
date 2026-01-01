import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailVerificationVerifiedDomainEvent } from '@identity-domain/verification/events/email-verification-verified.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class EmailVerificationVerifiedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(EmailVerificationVerifiedDomainEvent.Type)
  handle(event: EmailVerificationVerifiedDomainEvent): void {
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
            verified_at: event.props.verifiedAt,
          },
        }),
      ),
    });
  }
}
