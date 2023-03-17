import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { LokiUsersQueryRepository } from './infrastructure/loki/repositories/users.query-repository';
import { LokiUsersRepository } from './infrastructure/loki/repositories/users.repository';
import { CreateUserHandler } from './application/command-handlers/create-user.handler';
import { UsersController } from './api/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { QueryRepository } from '@app/@common/query-repository';
import { Repository } from '@app/@common/repository';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersService,
    {
      provide: Repository.name,
      useClass: LokiUsersRepository,
    },
    {
      provide: QueryRepository.name,
      useClass: LokiUsersQueryRepository,
    },
    CreateUserHandler,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
