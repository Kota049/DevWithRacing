import { BudgetHistory } from 'src/entity/budget.history';
import { Id } from 'src/entity/user';
import { BudgetHistoryRepositoryInterface } from 'src/repository/budget.history.repository';

export class BudgetHistoryService {
  constructor(private readonly bhr: BudgetHistoryRepositoryInterface) {}

  async findUserHistory(userId: Id): Promise<BudgetHistory[]> {
    const history = await this.bhr.findUserHistory(userId);
    return Promise.resolve(history);
  }
}
