import type { ResultType } from '@app/@common/types';

export abstract class QueryRepository<R> {
  abstract getById(id: string): Promise<ResultType<R>>;

  abstract getByQuery(query: Partial<R>): Promise<ResultType<R>>;
}
