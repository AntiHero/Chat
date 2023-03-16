import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { UsersController } from './api/controllers/users.controller';
import { UsersService } from './application/services/users.service';

@Module({
  imports: [CqrsModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
