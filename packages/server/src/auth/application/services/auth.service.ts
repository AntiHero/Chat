import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { type ActiveUserData } from '@app/auth/interfaces/active-user-data.interface';
import { UsersService } from '@app/users/application/services/users.service';
import { HashingService } from '@app/@common/abstracts/hashing.service';
import { type User } from '@app/users/domain/entities/user.entity';
import { ErrorResult } from '@app/@common/utils/ErrorResult';
import { LoginUserDto } from '@app/auth/api/dtos/login.dto';
import { SignUpDto } from '@app/auth/api/dtos/sign-up.dto';
import { unwrap } from '@app/@common/utils/unwrap';
import { Result } from '@app/@common/utils/Result';
import { jwtConfig } from '@app/config/jwt.config';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signUp(signUpDto: SignUpDto) {
    const { username, password } = signUpDto;

    const hashedPassword = await this.hashingService.hash(password);

    return this.usersService.create({ username, password: hashedPassword });
  }

  public async login(loginDto: LoginUserDto) {
    const userResult = await this.usersService.getByQuery({
      username: loginDto.username,
    });

    if (!userResult.ok) {
      return ErrorResult(new UnauthorizedException('Wrong credentials'));
    }

    const user = unwrap(userResult);

    if (!user) {
      return ErrorResult(new UnauthorizedException('Wrong credentials'));
    }

    const isPasswordCorrect = await this.hashingService.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return ErrorResult(new UnauthorizedException('Wrong credentials'));
    }

    const accessToken = await this.signToken({ username: user.username });

    return Result({ accessToken });
  }

  private async signToken(user: Partial<User>) {
    const accessToken = await this.jwtService.signAsync(
      {
        // good practice having a sub field
        sub: user.username,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
      },
    );

    return accessToken;
  }
}
