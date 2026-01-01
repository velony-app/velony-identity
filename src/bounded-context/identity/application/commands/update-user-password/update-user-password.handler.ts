import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UpdateUserPasswordCommand } from '@identity-application/commands/update-user-password/update-user-password.command';
import { UserNotFoundException } from '@identity-domain/user/exceptions/user-not-found.exception';
import { UserCommandRepository } from '@identity-domain/user/repositories/user.command.repository';
import { Password } from '@identity-domain/user/value-objects/password.vo';

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements ICommandHandler<UpdateUserPasswordCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: UpdateUserPasswordCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updateLocalAuthentication(
      Password.create(command.props.currentPassword),
      Password.create(command.props.password),
    );

    await this.userCommandRepository.save(user);

    const domainEvents = user.getDomainEvents();
    for (const event of domainEvents) {
      await this.eventEmitter.emitAsync(event.type, event);
    }
    user.clearDomainEvents();
  }
}
