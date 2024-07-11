import { GithubUser } from '@domain/entity/github.user';
import { GithubClientInterface } from '@domain/repository/github.client';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';

export class GithubClient implements GithubClientInterface {
  constructor(private readonly configService: ConfigService) {}
  async fetch(ghUser: GithubUser, to: Date, from: Date): Promise<number> {
    const oktokit = new Octokit({
      auth: ghUser.token,
    });
    let commitCount = 0;
    for (const repo of ghUser.repositories) {
      const { data } = await oktokit.repos.listCommits({
        owner: ghUser.githubName,
        repo: repo,
        since: from.toISOString(),
        until: from.toISOString(),
      });
      commitCount += data.length;
    }
    return Promise.resolve(commitCount);
  }
  async refreshToken(githubUser: GithubUser): Promise<GithubUser> {
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const oktokit = new Octokit({
      auth: githubUser.token,
    });
    const { data } = await oktokit.request('POST /login/oauth/access_token', {
      clientId: clientId,
      clientSecret: clientSecret,
      grantType: 'refresh_token',
      refreshToken: githubUser.refreshToken,
    });
    const token: string = data.access_token;
    const refreshToken: string = data.refresh_token;
    if (typeof token === 'undefined' || typeof refreshToken === 'undefined') {
      Promise.reject('トークンが取得できませんでkした');
    }

    githubUser.refreshToken = refreshToken;
    githubUser.token = token;
    return Promise.resolve(githubUser);
  }
}
