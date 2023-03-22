import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';

import { REQUEST_USER_KEY } from '@app/@common/constants';
import { jwtConfig } from '@app/config/jwt.config';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromCookie(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      request[REQUEST_USER_KEY] = payload.username;
      console.log(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromCookie(request: FastifyRequest): string | undefined {
    const accessToken = request.cookies['accessToken'];

    return accessToken;
  }
}
