import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserDto } from '@app/users/api/dtos/create-user.dto';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    return this.commandBus.execute(new CreateUserCommand(username, password));
  }
}
