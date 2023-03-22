import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AUTH_TYPE_KEY } from '@app/@common/decorators/auth.decorator';
import { AccessTokenGuard } from './access-token.guard';
import { AuthType } from '@app/@common/enums';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Cookie;

  private readonly authTypeGuardMap: Map<
    AuthType,
    CanActivate | CanActivate[]
  > = new Map([
    [AuthType.None, { canActivate: () => true }],
    [AuthType.Bearer, { canActivate: () => false }], // not implemented
    [
      AuthType.Cookie,
      {
        canActivate: this.accessTokenGuard.canActivate.bind(
          this.accessTokenGuard,
        ),
      },
    ],
  ]);

  public constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    const guards = authTypes
      .map((type) => this.authTypeGuardMap.get(type))
      .flat();

    const error: Error = new UnauthorizedException();

    for (const instance of guards) {
      try {
        const canActivate = await Promise.resolve(
          instance?.canActivate(context),
        );

        if (canActivate) {
          return true;
        }
      } catch (error) {
        error = error;
      }
    }

    throw error;
  }
}
