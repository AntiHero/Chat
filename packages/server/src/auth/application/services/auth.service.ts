import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '@app/users/application/services/users.service';
import { HashingService } from '@app/@common/abstracts/hashing.service';
import { ErrorResult } from '@app/@common/utils/ErrorResult';
import { LoginUserDto } from '@app/auth/api/dtos/login.dto';
import { SignUpDto } from '@app/auth/api/dtos/sign-up.dto';
import { unwrap } from '@app/@common/utils/unwrap';
import { Result } from '@app/@common/utils/Result';

@Injectable()
export class AuthService {
  public constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { username, password } = signUpDto;

    const hashedPassword = await this.hashingService.hash(password);

    return this.usersService.create({ username, password: hashedPassword });
  }

  async login(loginDto: LoginUserDto) {
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

    return Result(true);
  }
}
