import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { ActiveUserData } from '@app/auth/interfaces/active-user-data.interface';
import { REQUEST_USER_KEY } from '@app/@common/constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserData | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request[REQUEST_USER_KEY];

    return !field ? user : user?.[field];
  },
);
