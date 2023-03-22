import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

import { AccessTokenGuard } from '@app/@common/guards/access-token.guard';
import { HashingService } from '@app/@common/abstracts/hashing.service';
import { BcryptService } from './application/services/bcrypt.service';
import { AuthenticationGuard } from '@app/@common/guards/auth.guard';
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
    AccessTokenGuard,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
  ],
})
export class AuthModule {}
