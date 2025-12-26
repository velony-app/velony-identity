import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { validate } from './env.validation';
import { TypedConfigService } from './typed-config.service';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
    }),
  ],
  providers: [TypedConfigService],
  exports: [TypedConfigService],
})
export class ConfigModule {}
