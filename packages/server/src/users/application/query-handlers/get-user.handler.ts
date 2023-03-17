import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { QueryRepository } from '@app/@common/query-repository';
import { User } from '@app/users/domain/entities/user.entity';
import { GetUserQuery } from '../queries/get-user.query';

@QueryHandler(GetUserQuery)
export class CreateUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersQueryRepository: QueryRepository<User>) {}

  async execute(query: GetUserQuery) {
    return this.usersQueryRepository.getByQuery(query.user);
  }
}
