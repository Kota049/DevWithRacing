import { Id } from '@domain/entity/user';
import { GithubUserRepositoryInterface } from '@domain/repository/github.user.repository';
import { GithubUser } from '@domain/entity/github.user';
import { PrismaService } from './prisma.service';

export class GithubUserRepository implements GithubUserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(gu: GithubUser): Promise<GithubUser> {
    const githubUser = await this.prisma.githubUser.create({
      data: {
        userId: gu.userId.value,
        token: gu.refreshToken,
        refreshToken: gu.refreshToken,
        githubUserId: gu.githubUserId,
        githubUserName: gu.githubName,
        repositories: {
          create: gu.repositories.map((r) => {
            return { name: r };
          }),
        },
      },
      include: {
        repositories: true,
      },
    });
    const createdGithubUser = new GithubUser(
      new Id(githubUser.id),
      githubUser.token,
      githubUser.refreshToken,
      githubUser.githubUserId,
      githubUser.repositories.map((r) => r.name),
      githubUser.githubUserName,
    );
    return Promise.resolve(createdGithubUser);
  }
  async update(gh: GithubUser): Promise<GithubUser> {
    const githubUser = await this.prisma.githubUser.update({
      where: {
        userId: gh.userId.value,
      },
      data: {
        userId: gh.userId.value,
        token: gh.refreshToken,
        refreshToken: gh.refreshToken,
        githubUserId: gh.githubUserId,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, __, repositories] = await this.prisma.$transaction([
      this.prisma.repository.deleteMany({
        where: { githubUserId: gh.userId.value },
      }),
      this.prisma.repository.createMany({
        data: gh.repositories.map((r) => {
          return {
            githubUserId: gh.userId.value,
            name: r,
          };
        }),
      }),
      this.prisma.repository.findMany({
        where: {
          githubUserId: gh.userId.value,
        },
      }),
    ]);
    const updated = new GithubUser(
      new Id(githubUser.id),
      githubUser.token,
      githubUser.refreshToken,
      githubUser.githubUserId,
      repositories.map((r) => r.name),
      githubUser.githubUserName,
    );
    return Promise.resolve(updated);
  }
  async findOne(userId: Id): Promise<GithubUser> {
    const gh = await this.prisma.githubUser.findUnique({
      where: {
        userId: userId.value,
      },
      include: {
        repositories: true,
      },
    });
    const githubUser = new GithubUser(
      new Id(gh.userId),
      gh.token,
      gh.refreshToken,
      gh.githubUserId,
      gh.repositories.map((r) => r.name),
      gh.githubUserName,
    );
    return Promise.resolve(githubUser);
  }
}
