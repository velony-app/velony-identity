import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { ConfigModule } from '@config/config.module';

import { IdentityModule } from '@identity/identity.module';

@Module({
  imports: [EventEmitterModule.forRoot(), ConfigModule, IdentityModule],
})
export class AppModule {}
