import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { type ActiveUserData } from '@app/auth/interfaces/active-user-data.interface';
import { UsersService } from '@app/users/application/services/users.service';
import { HashingService } from '@app/@common/abstracts/hashing.service';
import { RefreshTokenDto } from '@app/auth/api/dtos/refresh-token.dto';
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

    return this.generateTokens(user);
  }

  public async generateTokens(user: Partial<User>) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        { username: user.username },
        this.jwtConfiguration.accessTokenTtl,
      ),
      this.signToken(
        { username: user.username },
        this.jwtConfiguration.refreshTokenTtl,
      ),
    ]);

    return Result({ accessToken, refreshToken });
  }

  private async signToken(user: Partial<User>, expiresIn: number) {
    const token = await this.jwtService.signAsync(
      {
        // good practice having a sub field
        sub: user.username,
      } as ActiveUserData,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );

    return token;
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const userResult = await this.usersService.getByQuery({ username: sub });

      const user = unwrap(userResult);
      console.log(user);

      if (!user) {
        return ErrorResult(new UnauthorizedException('Wrong credentials'));
      }

      return this.generateTokens(user);
    } catch (error) {
      console.log(error);

      return ErrorResult(error);
    }
  }
}
