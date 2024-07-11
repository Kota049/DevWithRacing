import { Id } from './user';

export class GithubUser {
  constructor(
    public userId: Id,
    public token: string,
    public refreshToken: string,
    public githubUserId: string,
    public repositories: string[],
    public githubName: string,
  ) {}
}
