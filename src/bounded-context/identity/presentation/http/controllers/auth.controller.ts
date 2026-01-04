import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { type Request, type Response } from 'express';

import { LoginLocalCommand } from '@identity-application/commands/login-local/login-local.command';
import { RefreshTokenCommand } from '@identity-application/commands/refresh-token/refresh-token.command';
import { RegisterLocalCommand } from '@identity-application/commands/register-local/register-local.command';
import { CookieAuthService } from '@identity-infrastructure/services/cookie-auth.service';
import { LoginLocalDto } from '@identity-presentation/http/dtos/login-local.dto';
import { RegisterLocalDto } from '@identity-presentation/http/dtos/register-local.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly cookieAuthService: CookieAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async loginLocal(
    @Body() dto: LoginLocalDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const command = new LoginLocalCommand({
      username: dto.username,
      password: dto.password,
    });
    const { accessToken, refreshToken } =
      await this.commandBus.execute(command);

    this.cookieAuthService.setAccessToken(response, accessToken);
    this.cookieAuthService.setRefreshToken(response, refreshToken);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerLocal(
    @Body() dto: RegisterLocalDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const command = new RegisterLocalCommand({
      name: dto.name,
      username: dto.username,
      password: dto.password,
    });
    const { accessToken, refreshToken } =
      await this.commandBus.execute(command);

    this.cookieAuthService.setAccessToken(response, accessToken);
    this.cookieAuthService.setRefreshToken(response, refreshToken);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const refreshToken = this.cookieAuthService.getRefreshToken(request);

    const command = new RefreshTokenCommand({ refreshToken });
    const { accessToken } = await this.commandBus.execute(command);

    this.cookieAuthService.setAccessToken(response, accessToken);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    this.cookieAuthService.clear(response);
  }
}
