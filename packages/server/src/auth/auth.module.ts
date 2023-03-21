import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { HashingService } from '@app/@common/abstracts/hashing.service';
import { BcryptService } from './application/services/bcrypt.service';
import { AuthController } from './api/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { UsersModule } from '@app/users/users.module';
import { jwtConfig } from '@app/config/jwt.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
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
