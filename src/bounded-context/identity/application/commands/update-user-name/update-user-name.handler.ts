import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { UpdateUserNameCommand } from '@identity-application/commands/update-user-name/update-user-name.command';
import { UserNotFoundException } from '@identity-domain/user/exceptions/user-not-found.exception';
import { UserCommandRepository } from '@identity-domain/user/repositories/user.command.repository';
import { Name } from '@identity-domain/user/value-objects/name.vo';

@CommandHandler(UpdateUserNameCommand)
export class UpdateUserNameHandler implements ICommandHandler<UpdateUserNameCommand> {
  constructor(
    private readonly userCommandRepository: UserCommandRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute(command: UpdateUserNameCommand): Promise<void> {
    const user = await this.userCommandRepository.findById(
      command.context.userId,
    );
    if (!user) {
      throw new UserNotFoundException();
    }

    user.updateName(Name.create(command.props.name));

    await this.userCommandRepository.save(user);

    const domainEvents = user.getDomainEvents();
    for (const event of domainEvents) {
      await this.eventEmitter.emitAsync(event.type, event);
    }
    user.clearDomainEvents();
  }
}
