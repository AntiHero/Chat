import { Injectable } from '@nestjs/common';
import Loki, { Collection } from 'lokijs';

import { QueryRepository } from '@app/@common/abstracts/query-repository';
import { User } from '@app/users/domain/entities/user.entity';
import { wrap } from '@app/@common/utils/wrap';
import { Result } from '@app/@common/types';

@Injectable()
export class LokiUsersQueryRepository implements QueryRepository<User | null> {
  private readonly users: Collection<User>;

  public constructor(private readonly db: Loki) {
    this.users = this.db.addCollection<User>('users');
  }

  async getById(id: string): Promise<Result<User | null>> {
    try {
      const user = this.users.findOne({ id });

      return wrap(user);
    } catch (error) {
      console.log(error);

      return wrap(error);
    }
  }

  async getByQuery(query: Partial<User>): Promise<Result<User | null>> {
    try {
      const user = this.users.findOne(query);

      return wrap(user);
    } catch (error) {
      console.log(error);

      return wrap(error);
    }
  }
}
