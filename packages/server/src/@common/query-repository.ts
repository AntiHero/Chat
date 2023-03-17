export abstract class QueryRepository {
  abstract getById<R>(id: string): Promise<R>;

  abstract getAll<R>(): Promise<R>;
}
