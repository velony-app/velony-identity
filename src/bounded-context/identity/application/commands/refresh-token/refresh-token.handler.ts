import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { RefreshTokenCommand } from '@identity-application/commands/refresh-token/refresh-token.command';
import { TokenService } from '@identity-application/services/token.service';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler implements ICommandHandler<RefreshTokenCommand> {
  constructor(private readonly tokenService: TokenService) {}

  async execute(command: RefreshTokenCommand) {
    const payload = this.tokenService.verifyRefreshToken(
      command.props.refreshToken,
    );

    // TODO: Store refresh tokens in PostgreSQL/Redis for proper revocation
    // TODO: Check if token exists in storage and is not revoked
    // TODO: Implement token rotation (generate new refresh token on each use)
    // TODO: Add device management and session tracking
    const accessToken = this.tokenService.generateAccessToken({
      sub: payload.sub,
    });

    return { accessToken };
  }
}
