import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot(), ChatModule],
  controllers: [AppController],
})
export class AppModule {}
