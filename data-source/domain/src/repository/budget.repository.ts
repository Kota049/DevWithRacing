import { Budget } from 'src/entity/budget';
import { RepositoryInterface } from './repository';
import { Id } from 'src/entity/user';

export abstract class BudgetRepositoryInterface extends RepositoryInterface<Budget> {
  abstract findOne(userId: Id): Promise<Budget>;
}
