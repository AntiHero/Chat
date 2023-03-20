import type { Result } from '@app/@common/types';

export abstract class Repository<T, R> {
  abstract save(data: T): Promise<Result<R>>;

  abstract deleteById(id: string): Promise<void | null>;
}
