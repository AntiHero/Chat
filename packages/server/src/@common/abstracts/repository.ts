import type { ResultType } from '@app/@common/types';

export abstract class Repository<T, R> {
  abstract save(data: T): Promise<ResultType<R>>;

  abstract deleteById(id: string): Promise<void | null>;
}
