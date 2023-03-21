import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { CreateUserCommand } from '@app/users/application/commands/create-user.command';
import { GetUserQuery } from '@app/users/application/queries/get-user.query';
import { CreateUserDto } from '@app/users/application/dtos/create-user.dto';
import { User, UserEntity } from '@app/users/domain/entities/user.entity';
import { type ResultType } from '@app/@common/types';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResultType<User, Error>> {
    const { username, password } = createUserDto;

    const newUser = new UserEntity(username, password);

    return this.commandBus.execute(
      new CreateUserCommand({
        id: newUser.id,
        password: newUser.password,
        username: newUser.username,
      }),
    );
  }

  async getByQuery(query: Partial<User>): Promise<ResultType<User, Error>> {
    return this.queryBus.execute(new GetUserQuery(query));
  }
}
