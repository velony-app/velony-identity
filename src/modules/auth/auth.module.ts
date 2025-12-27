import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PgModule } from 'src/shared/infrastructure/persistence/pg/pg.module';

import { UserModule } from '../user/user.module';
import { LoginLocalHandler } from './application/commands/handlers/login-local.handler';
import { RegisterLocalHandler } from './application/commands/handlers/register-local.handler';
import { TokenService } from './domain/services/token.service';
import { AuthController } from './infrastructure/http/auth.controller';
import { JwtTokenService } from './infrastructure/services/jwt-token.service';

@Module({
  imports: [CqrsModule, JwtModule, PgModule, UserModule],
  controllers: [AuthController],
  providers: [
    LoginLocalHandler,
    RegisterLocalHandler,
    {
      provide: TokenService,
      useClass: JwtTokenService,
    },
  ],
})
export class AuthModule {}
