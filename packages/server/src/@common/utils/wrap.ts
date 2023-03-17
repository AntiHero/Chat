import { Result } from '../types';

export const wrap = <T>(valueOrError: T | Error, ok = true): Result<T, Error> =>
  ok
    ? { ok: true, value: valueOrError as T }
    : { ok: false, error: valueOrError as Error };
