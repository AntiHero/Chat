import type { User } from '@app/users/domain/entities/user.entity';

export class GetUserQuery {
  public constructor(public readonly user: Partial<User>) {}
}
