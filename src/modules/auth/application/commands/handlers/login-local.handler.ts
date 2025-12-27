import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from 'src/modules/auth/domain/services/token.service';
import { AccessTokenPayload } from 'src/modules/auth/domain/value-objects/access-token-payload.vo';
import { RefreshTokenPayload } from 'src/modules/auth/domain/value-objects/refresh-token-payload.vo';
import { InvalidUsernameOrPasswordException } from 'src/modules/user/domain/exceptions/invalid-username-or-password.exception';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Password } from 'src/modules/user/domain/value-objects/password.vo';
import { Username } from 'src/modules/user/domain/value-objects/username.vo';

import { LoginLocalCommand } from '../login-local.command';

@CommandHandler(LoginLocalCommand)
export class LoginLocalHandler implements ICommandHandler<LoginLocalCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: LoginLocalCommand) {
    const user = await this.userCommandRepository.findByUsername(
      Username.create(command.props.username),
    );
    if (!user) {
      throw new InvalidUsernameOrPasswordException();
    }

    const passwordVerified = await user.verifyPassword(
      Password.create(command.props.password),
    );
    if (!passwordVerified) {
      throw new InvalidUsernameOrPasswordException();
    }

    const accessToken = this.tokenService.generateAccessToken(
      AccessTokenPayload.create({ sub: user.id }),
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      RefreshTokenPayload.create({ sub: user.id }),
    );

    return { accessToken, refreshToken };
  }
}
