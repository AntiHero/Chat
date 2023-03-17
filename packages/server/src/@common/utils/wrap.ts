import { Result } from '../types';

export const wrap = <T, R = Error>(
  valueOrError: T | R,
  ok: boolean,
): Result<T, R> =>
  ok
    ? { ok: true, value: valueOrError as T }
    : { ok: false, error: valueOrError as R };
