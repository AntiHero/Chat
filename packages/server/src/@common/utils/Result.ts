import { ResultType } from '@app/@common/types';

export function Result<T>(value: T): ResultType<T> {
  return { ok: true, value };
}
