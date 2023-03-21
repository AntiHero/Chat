import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from '@app/auth/application/services/auth.service';
import { UserMapper } from '@app/users/utils/mappers/user.mapper';
import { LoginUserDto } from '@app/auth/api/dtos/login.dto';
import { SignUpDto } from '@app/auth/api/dtos/sign-up.dto';
import { ApiPaths } from '@app/config/api.config';

@Controller(ApiPaths.auth.base)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post(ApiPaths.auth.signup)
  async signUp(@Body() signUpUserDto: SignUpDto) {
    const user = await this.authService.signUp(signUpUserDto);

    if (!user.ok) throw user.error;

    return UserMapper.mapToViewModel(user.value);
  }

  @HttpCode(HttpStatus.OK)
  @Post(ApiPaths.auth.login)
  async login(@Body() loginUserDto: LoginUserDto) {
    const loginResult = await this.authService.login(loginUserDto);

    if (!loginResult.ok) throw loginResult.error;

    return loginResult.value;
  }

  @Post(ApiPaths.auth.logout)
  async logout() {
    return null;
  }
}