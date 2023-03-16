import type { User } from '@app/users/domain/entities/user.entity';

export class UserViewModel implements Omit<User, 'password'> {
  public readonly id: string;

  public readonly username: string;
}
