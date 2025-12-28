import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TypedConfigService } from 'src/config/typed-config.service';
import { UserCreatedDomainEvent } from 'src/modules/user/domain/events/user-created.domain-event';
import type { EventContext } from 'src/shared/application/event-context.interface';
import { KafkaService } from 'src/shared/infrastructure/events/kafka.service';

@Injectable()
export class UserCreatedEventHandler {
  constructor(
    private readonly configService: TypedConfigService,
    private readonly kafkaService: KafkaService,
  ) {}

  @OnEvent(UserCreatedDomainEvent.TYPE)
  handle(event: UserCreatedDomainEvent, context: EventContext): void {
    this.kafkaService.client.emit('identity.user', {
      key: event.aggregateId,
      value: Buffer.from(
        JSON.stringify({
          meta: {
            event_id: event.id,
            event_type: event.type,
            user_id: context.userId,
            correlation_id: context.correlationId,
            source: this.configService.get('SERVICE_NAME'),
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
