import { CommitHistory } from '@domain/entity/commit.history';
import { Id } from '@domain/entity/user';
import { CommitHistoryRepositoryInterface } from '@domain/repository/commit.history.repository';
import { PrismaService } from './prisma.service';

export class CommitHistoryRepository
  implements CommitHistoryRepositoryInterface
{
  constructor(private prisma: PrismaService) {}
  async create(ch: CommitHistory): Promise<CommitHistory> {
    const commitHistory = await this.prisma.commitHistory.create({
      data: {
        userId: ch.userId.value,
        commitCount: ch.diff,
        createdAt: ch.createdAt,
      },
    });
    const createdCommitHitory = new CommitHistory(
      new Id(commitHistory.id),
      commitHistory.commitCount,
      commitHistory.createdAt,
    );
    return Promise.resolve(createdCommitHitory);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(ch: CommitHistory): Promise<CommitHistory> {
    throw new Error('Method not implemented.');
  }

  async findUserHistory(userId: Id): Promise<CommitHistory[]> {
    const dbCommitHitories = await this.prisma.commitHistory.findMany({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    const commitHistories = dbCommitHitories.map((ch) => {
      return new CommitHistory(new Id(ch.userId), ch.commitCount, ch.createdAt);
    });
    return Promise.resolve(commitHistories);
  }
  async findLatest(userId: Id): Promise<CommitHistory> {
    const dbCommitHistory = await this.prisma.commitHistory.findFirst({
      where: { userId: userId.value },
      orderBy: { createdAt: 'desc' },
    });
    const commitHitory = new CommitHistory(
      new Id(dbCommitHistory.id),
      dbCommitHistory.commitCount,
      dbCommitHistory.createdAt,
    );
    return Promise.resolve(commitHitory);
  }
}
