export type ResultType<T, R = Error> =
  | { ok: true; value: T }
  | { ok: false; error: R };
