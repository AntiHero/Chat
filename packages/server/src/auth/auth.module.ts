import { Module } from '@nestjs/common';

import { HashingService } from '@app/@common/abstracts/hashing.service';
import { BcryptService } from './application/services/bcrypt.service';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UsersModule } from '@app/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class AuthModule {}
