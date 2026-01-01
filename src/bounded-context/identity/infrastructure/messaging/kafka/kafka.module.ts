import { Module } from '@nestjs/common';

import { KafkaService } from '@identity-infrastructure/messaging/kafka/kafka.service';

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}
