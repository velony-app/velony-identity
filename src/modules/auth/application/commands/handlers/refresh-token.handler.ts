import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { InvalidRefreshTokenException } from 'src/modules/auth/domain/exceptions/invalid-refresh-token.exception';
import { TokenService } from 'src/modules/auth/domain/services/token.service';
import { AccessTokenPayload } from 'src/modules/auth/domain/value-objects/access-token-payload.vo';
import { UserCommandRepository } from 'src/modules/user/domain/repositories/user.command.repository';

import { RefreshTokenCommand } from '../refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RefreshTokenCommand) {
    const payload = this.tokenService.verifyRefreshToken(
      command.props.refreshToken,
    );

    const user = await this.userCommandRepository.findById(payload.sub);
    if (!user) {
      throw new InvalidRefreshTokenException();
    }

    const accessToken = this.tokenService.generateAccessToken(
      AccessTokenPayload.create({ sub: user.id }),
    );

    return { accessToken };
  }
}
