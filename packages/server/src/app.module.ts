import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule],
  controllers: [AppController],
})
export class AppModule {}
