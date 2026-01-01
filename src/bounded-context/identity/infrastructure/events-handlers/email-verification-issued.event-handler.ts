import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { EmailVerificationIssuedDomainEvent } from '@identity-domain/verification/events/email-verification-issued.domain-event';
import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Injectable()
export class EmailVerificationIssuedEventHandler {
  constructor(private readonly kafkaService: KafkaService) {}

  @OnEvent(EmailVerificationIssuedDomainEvent.Type)
  handle(event: EmailVerificationIssuedDomainEvent): void {
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
            user_id: event.props.userId,
            token: event.props.token,
            value: event.props.value,
            issued_at: event.props.issuedAt,
            expires_at: event.props.expiresAt,
          },
        }),
      ),
    });
  }
}
