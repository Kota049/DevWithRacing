import { Budget } from 'src/entity/budget';
import { Id } from 'src/entity/user';
import { BudgetRepositoryInterface } from 'src/repository/budget.repository';

export class BudgetService {
  constructor(private readonly br: BudgetRepositoryInterface) {}
  async getCurrentBudget(userId: Id): Promise<Budget> {
    const currentBudget = await this.br.findOne(userId);
    return Promise.resolve(currentBudget);
  }
  async init(userId: Id): Promise<Budget> {
    const newBudget = new Budget(0, userId);
    const createdBudget = await this.br.create(newBudget);
    return Promise.resolve(createdBudget);
  }
}
