import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from 'src/modules/auth/domain/services/token.service';
import { AccessTokenPayload } from 'src/modules/auth/domain/value-objects/access-token-payload.vo';
import { RefreshTokenPayload } from 'src/modules/auth/domain/value-objects/refresh-token-payload.vo';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';
import { Name } from 'src/modules/user/domain/value-objects/name.vo';
import { Password } from 'src/modules/user/domain/value-objects/password.vo';
import { Username } from 'src/modules/user/domain/value-objects/username.vo';

import { RegisterLocalCommand } from '../register-local.command';

@CommandHandler(RegisterLocalCommand)
export class RegisterLocalHandler implements ICommandHandler<RegisterLocalCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RegisterLocalCommand) {
    const user = await UserEntity.create({
      name: Name.create(command.props.name),
      username: Username.create(command.props.username),
      password: Password.create(command.props.password),
    });
    await this.userCommandRepository.save(user);

    const accessToken = this.tokenService.generateAccessToken(
      AccessTokenPayload.create({ sub: user.id }),
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      RefreshTokenPayload.create({ sub: user.id }),
    );

    return { accessToken, refreshToken };
  }
}
