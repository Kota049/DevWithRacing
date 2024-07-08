export abstract class RepositoryInterface<T> {
  abstract create(t: T): Promise<T>;
  abstract update(t: T): Promise<T>;
  abstract findAll(): Promise<T[]>;
}
