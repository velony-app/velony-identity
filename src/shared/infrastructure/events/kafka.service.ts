import { readFileSync } from 'fs';

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import {
  type ClientKafkaProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { TypedConfigService } from 'src/config/typed-config.service';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafkaClient: ClientKafkaProxy;

  constructor(private readonly configService: TypedConfigService) {
    this.kafkaClient = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'velony.identity',
          brokers: this.configService.get('KAFKA_BROKERS'),
          ssl: {
            ca: [
              // eslint-disable-next-line security/detect-non-literal-fs-filename
              readFileSync(this.configService.get('KAFKA_CA_PATH'), 'utf-8'),
            ],
          },
          sasl: {
            mechanism: 'scram-sha-256',
            username: this.configService.get('KAFKA_USERNAME'),
            password: this.configService.get('KAFKA_PASSWORD'),
          },
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.kafkaClient.connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.kafkaClient.close();
  }

  get client(): ClientKafkaProxy {
    return this.kafkaClient;
  }
}
