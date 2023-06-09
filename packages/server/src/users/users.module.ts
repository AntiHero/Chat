import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import Loki from 'lokijs';

import { LokiUsersQueryRepository } from './infrastructure/loki/repositories/users.query-repository';
import { UniqueUsernameConstraint } from '@app/@common/validators/unique-username.validator';
import { LokiUsersRepository } from './infrastructure/loki/repositories/users.repository';
import { CreateUserHandler } from './application/command-handlers/create-user.handler';
import { GetUserHandler } from './application/query-handlers/get-user.handler';
import { QueryRepository } from '@app/@common/abstracts/query-repository';
import { UsersService } from './application/services/users.service';
import { Repository } from '@app/@common/abstracts/repository';

@Module({
  imports: [CqrsModule],
  providers: [
    UniqueUsernameConstraint,
    CreateUserHandler,
    GetUserHandler,
    UsersService,
    {
      provide: Repository,
      useClass: LokiUsersRepository,
    },
    {
      provide: QueryRepository,
      useClass: LokiUsersQueryRepository,
    },
    {
      provide: Loki,
      useFactory: () => {
        return new Loki('users.db');
      },
    },
  ],
  controllers: [],
  exports: [UsersService],
})
export class UsersModule {}
