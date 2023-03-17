import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '@app/users/application/commands/create-user.command';
import { CreateUserDto } from '@app/users/api/dtos/create-user.dto';
import { UserEntity } from '@app/users/domain/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly commandBus: CommandBus) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;

    const newUser = new UserEntity(username, password);

    return this.commandBus.execute(new CreateUserCommand(newUser));
  }
}
