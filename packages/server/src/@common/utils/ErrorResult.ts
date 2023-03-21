import { ResultType } from '@app/@common/types';

export function ErrorResult<T>(error: T): ResultType<never, T> {
  return { ok: false, error };
}
