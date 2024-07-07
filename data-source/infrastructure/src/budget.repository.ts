import { BudgetRepositoryInterface } from '@domain/repository/budget.repository';
import { Budget } from '@domain/entity/budget';
import { Id } from '@domain/entity/user';
import { PrismaService } from './prisma.service';

export class BudgetRepository implements BudgetRepositoryInterface {
  constructor(private prisma: PrismaService) {}
  async findOne(userId: Id): Promise<Budget> {
    const budget = await this.prisma.budget.findUnique({
      where: { userId: userId.value },
    });
    const domainBudget = new Budget(budget.amount, userId);
    return Promise.resolve(domainBudget);
  }
  async create(t: Budget): Promise<Budget> {
    const newDbbudget = await this.prisma.budget.create({
      data: {
        userId: t.userId.value,
        amount: t.budget,
      },
    });
    const newBudget = new Budget(
      newDbbudget.amount,
      new Id(newDbbudget.userId),
    );
    return Promise.resolve(newBudget);
  }
  async update(t: Budget): Promise<Budget> {
    const currentDbBudget = await this.prisma.budget.findUnique({
      where: { userId: t.userId.value },
    });
    const updatedDbBudget = await this.prisma.budget.update({
      where: {
        id: currentDbBudget.id,
      },
      data: {
        userId: t.userId.value,
        amount: t.budget,
      },
    });
    const updatedBudget = new Budget(
      updatedDbBudget.amount,
      new Id(updatedDbBudget.userId),
    );
    return Promise.resolve(updatedBudget);
  }
  async findAll(): Promise<Budget[]> {
    const dbBudgetList = await this.prisma.budget.findMany();
    const budgetList = dbBudgetList.map(
      (d) => new Budget(d.amount, new Id(d.userId)),
    );
    return Promise.resolve(budgetList);
  }
}
