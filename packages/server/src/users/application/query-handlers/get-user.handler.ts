import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetUserQuery } from '@app/users/application/queries/get-user.query';
import { QueryRepository } from '@app/@common/abstracts/query-repository';
import { User } from '@app/users/domain/entities/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly usersQueryRepository: QueryRepository<User>) {}

  async execute(query: GetUserQuery) {
    return this.usersQueryRepository.getByQuery(query.user);
  }
}
