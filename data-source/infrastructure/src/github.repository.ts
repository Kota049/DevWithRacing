import { GithubUser } from '@domain/entity/github.user';

// FIXME:githubUserに依存してる
export abstract class GithubRepositoryInterface {
  abstract fetch(ghUser: GithubUser, to: Date, from: Date): Promise<number>;
}
