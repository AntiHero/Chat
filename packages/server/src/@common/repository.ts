export abstract class Repository<T, R> {
  abstract save(data: T): Promise<R | null | undefined>;

  abstract deleteById(id: string): Promise<void | null>;
}
