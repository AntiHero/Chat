import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { LokiUsersRepository } from './infrastructure/loki/repositories/user.repository';
import { CreateUserHandler } from './application/command-handlers/create-user.handler';
import { UsersController } from './api/controllers/users.controller';
import { UsersService } from './application/services/users.service';
import { LOKI_TOKEN } from '@app/@common/constants';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersService,
    {
      provide: LOKI_TOKEN,
      useClass: LokiUsersRepository,
    },
    CreateUserHandler,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
