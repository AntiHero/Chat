import { Result } from './types';

export abstract class QueryRepository<R> {
  abstract getById(id: string): Promise<Result<R>>;

  abstract getByQuery(query: Partial<R>): Promise<Result<R>>;
}
