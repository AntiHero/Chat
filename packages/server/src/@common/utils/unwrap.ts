import type { ResultType } from '@app/@common/types';

export const unwrap = <T>(wrapped: ResultType<T>) => {
  if (wrapped.ok) {
    return wrapped.value;
  }

  return null;
};
