import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { RemoveUserPasswordCommand } from '@identity-application/commands/remove-user-password/remove-user-password.command';
import { UserNotFoundException } from '@identity-domain/user/exceptions/user-not-found.exception';
import { UserCommandRepository } from '@identity-domain/user/repositories/user.command.repository';
import { Password } from '@identity-domain/user/value-objects/password.vo';

@CommandHandler(RemoveUserPasswordCommand)
export class RemoveUserPasswordHandler implements ICommandHandler<RemoveUserPasswordCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: RemoveUserPasswordCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.removeLocalAuthentication(
      Password.create(command.props.currentPassword),
    );

    await this.userCommandRepository.save(user);

    const domainEvents = user.getDomainEvents();
    for (const event of domainEvents) {
      await this.eventEmitter.emitAsync(event.type, event);
    }
    user.clearDomainEvents();
  }
}
