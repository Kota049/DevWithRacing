import { Id } from './user';

export class BudgetHistory {
  constructor(
    public userId: Id,
    public diff: number,
    public createdAt: Date,
    public createdBy: BudgetUpdater,
  ) {}
}

export enum BudgetUpdater {
  COMMIT,
  WIN,
  RESTITUTION,
  BUY,
}

export function toBudgetUpdater(s: string): BudgetUpdater {
  if (s === 'COMMIT') {
    return BudgetUpdater.COMMIT;
  }
  if (s === 'WIN') {
    return BudgetUpdater.WIN;
  }
  if (s === 'COMMIT') {
    return BudgetUpdater.RESTITUTION;
  }
  return BudgetUpdater.BUY;
}
