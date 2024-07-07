import { Budget } from 'src/entity/budget';
import { RepositoryInterface } from './repository';

export abstract class BudgetRepositoryInterface extends RepositoryInterface<Budget> {}
