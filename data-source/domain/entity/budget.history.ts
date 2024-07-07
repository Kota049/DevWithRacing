import { Id } from './user';

export class BudgetHistory {
  constructor(
    public userId: Id,
    public diff: number,
    public createdAt: Date,
    public createdBy: BugetUpdater,
  ) {}
}

export enum BugetUpdater {
  COMMIT,
  WIN,
  RESTITUTION,
  BUY,
}
