import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { LoginLocalDto } from './dtos/login-local.dto';
import { RegisterLocalDto } from './dtos/register-local.dto';
import { LoginLocalCommand } from '../../application/commands/login-local.command';
import { RegisterLocalCommand } from '../../application/commands/register-local.command';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('login')
  async loginLocal(@Body() dto: LoginLocalDto): Promise<void> {
    const command = new LoginLocalCommand({
      username: dto.username,
      password: dto.password,
    });
    await this.commandBus.execute(command);
  }

  @Post('register')
  async registerLocal(@Body() dto: RegisterLocalDto): Promise<void> {
    const command = new RegisterLocalCommand({
      name: dto.name,
      username: dto.username,
      password: dto.password,
    });
    await this.commandBus.execute(command);
  }
}
