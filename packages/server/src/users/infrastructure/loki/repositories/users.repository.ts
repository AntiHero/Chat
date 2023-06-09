import { Injectable } from '@nestjs/common';
import Loki, { Collection } from 'lokijs';

import { Repository } from '@app/@common/abstracts/repository';
import { User } from '@app/users/domain/entities/user.entity';
import type { ResultType } from '@app/@common/types';
import { wrap } from '@app/@common/utils/wrap';

@Injectable()
export class LokiUsersRepository implements Repository<User, User | undefined> {
  private readonly users: Collection<User>;

  public constructor(private readonly db: Loki) {
    this.users = this.db.addCollection<User>('users');
  }

  async save(data: User): Promise<ResultType<User | undefined>> {
    try {
      const savedUser = this.users.insert(data);

      return wrap(savedUser);
    } catch (error) {
      console.log(error);

      return wrap(error);
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
