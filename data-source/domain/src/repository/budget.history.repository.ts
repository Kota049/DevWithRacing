import { BudgetHistory } from 'src/entity/budget.history';
import { RepositoryInterface } from './repository';
import { Id } from 'src/entity/user';

export abstract class BudgetHistoryRepositoryInterface extends RepositoryInterface<BudgetHistory> {
  abstract findUserHistory(userId: Id): Promise<BudgetHistory[]>;
}
