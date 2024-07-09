export abstract class RepositoryInterface<T, S> {
  abstract create(t: S): Promise<T>;
  abstract update(t: T): Promise<T>;
}
