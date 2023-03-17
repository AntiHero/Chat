import type { User } from '@app/users/domain/entities/user.entity';

export class CreateUserCommand {
  constructor(public user: User) {}
}
