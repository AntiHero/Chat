import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateUserCommand } from '@app/users/application/commands/create-user.command';
import { User } from '@app/users/domain/entities/user.entity';
import { Repository } from '@app/@common/repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly usersRepository: Repository<User, User>) {}

  async execute(command: CreateUserCommand) {
    return this.usersRepository.save(command.user);
  }
}
