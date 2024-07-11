import { BudgetHistoryRepositoryInterface } from '@domain/repository/budget.history.repository';
import { BudgetHistory, toBudgetUpdater } from '@domain/entity/budget.history';
import { Id } from '@domain/entity/user';
import { PrismaService } from './prisma.service';

export class BudgetHistoryRepository
  implements BudgetHistoryRepositoryInterface
{
  constructor(private prisma: PrismaService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- 使用しないため
  update(t: BudgetHistory): Promise<BudgetHistory> {
    throw new Error('Method not implemented.');
  }
  async findUserHistory(userId: Id): Promise<BudgetHistory[]> {
    const dbHistories = await this.prisma.budgetHistory.findMany({
      where: { userId: userId.value },
    });
    const histories = dbHistories.map((h) => {
      return new BudgetHistory(
        new Id(h.userId),
        h.diff,
        h.createdAt,
        toBudgetUpdater(h.createdBy),
      );
    });
    return Promise.resolve(histories);
  }
  async create(t: BudgetHistory): Promise<BudgetHistory> {
    const newDbbudget = await this.prisma.budgetHistory.create({
      data: {
        userId: t.userId.value,
        diff: t.diff,
        createdBy: t.createdBy.toString(),
        createdAt: t.createdAt,
      },
    });
    const newBudgetHistory = new BudgetHistory(
      new Id(newDbbudget.userId),
      newDbbudget.diff,
      newDbbudget.createdAt,
      toBudgetUpdater(newDbbudget.createdBy),
    );
    return Promise.resolve(newBudgetHistory);
  }
}
