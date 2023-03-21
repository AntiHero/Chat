import type { ResultType } from '../types';

export const wrap = <T>(valueOrError: T | Error): ResultType<T, Error> =>
  !(valueOrError instanceof Error)
    ? { ok: true, value: valueOrError as T }
    : { ok: false, error: valueOrError as Error };
