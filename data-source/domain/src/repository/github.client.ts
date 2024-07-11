import { GithubUser } from 'src/entity/github.user';

// FIXME:githubUserに依存してる
export abstract class GithubClientInterface {
  abstract fetch(ghUser: GithubUser, to: Date, from: Date): Promise<number>;
  abstract refreshToken(githubUser: GithubUser): Promise<GithubUser>;
}
