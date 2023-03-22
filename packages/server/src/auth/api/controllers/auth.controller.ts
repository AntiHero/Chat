import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { AuthService } from '@app/auth/application/services/auth.service';
import { RefreshTokenDto } from '@app/auth/api/dtos/refresh-token.dto';
import { Cookies } from '@app/@common/decorators/cookies.decorator';
import { UserMapper } from '@app/users/utils/mappers/user.mapper';
import { Auth } from '@app/@common/decorators/auth.decorator';
import { LoginUserDto } from '@app/auth/api/dtos/login.dto';
import { SignUpDto } from '@app/auth/api/dtos/sign-up.dto';
import { unwrap } from '@app/@common/utils/unwrap';
import { ApiPaths } from '@app/config/api.config';
import { AuthType } from '@app/@common/enums';

@Auth(AuthType.None)
@Controller(ApiPaths.auth.base)
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post(ApiPaths.auth.signup)
  public async signUp(@Body() signUpUserDto: SignUpDto) {
    const user = await this.authService.signUp(signUpUserDto);

    if (!user.ok) throw user.error;

    return UserMapper.mapToViewModel(user.value);
  }

  @HttpCode(HttpStatus.OK)
  @Post(ApiPaths.auth.login)
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const loginResult = await this.authService.login(loginUserDto);

    if (!loginResult.ok) throw loginResult.error;

    const { accessToken, refreshToken } = loginResult.value;

    response
      .setCookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .setCookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      });
  }

  @Post(ApiPaths.auth.logout)
  public async logout() {
    return null;
  }

  @Post(ApiPaths.auth.refreshToken)
  public async refreshTokens(
    @Cookies() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    const tokensResult = await this.authService.refreshTokens(refreshTokenDto);

    const tokens = unwrap(tokensResult);

    if (!tokens) throw new UnauthorizedException();

    const { accessToken, refreshToken } = tokens;

    response
      .setCookie('accessToken', accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      })
      .setCookie('refreshToken', refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: true,
      });
  }
}
