export type Result<T, R = Error> =
  | { ok: true; value: T }
  | { ok: false; error: R };
