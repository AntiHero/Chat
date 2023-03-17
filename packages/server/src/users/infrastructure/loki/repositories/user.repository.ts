import { Injectable } from '@nestjs/common';
import Loki, { Collection } from 'lokijs';

import { User } from '@app/users/domain/entities/user.entity';
import { Repository } from '@app/@common/repository';

@Injectable()
export class LokiUsersRepository implements Repository<User, User> {
  private readonly db: Loki;

  private readonly users: Collection<User>;

  public constructor() {
    this.db = new Loki('users.db');
    this.users = this.db.addCollection<User>('users');
  }

  async save(data: User): Promise<User | null | undefined> {
    try {
      const savedUser = this.users.insert(data);

      return savedUser;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  async deleteById(id: string): Promise<void | null> {
    try {
      this.users.findAndRemove({ id });
    } catch (error) {
      console.log(error);

      return null;
    }
  }
}
