import { UserViewModel } from '@app/users/domain/models/user-view.model';
import { User } from '@app/users/domain/entities/user.entity';

export class UserMapper {
  public static mapToViewModel(user: User): UserViewModel {
    return {
      id: user.id,
      username: user.username,
    };
  }
}
