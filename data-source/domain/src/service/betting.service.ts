import { Betting } from 'src/entity/betting';
import { Budget } from 'src/entity/budget';
import { BudgetHistory, BudgetUpdater } from 'src/entity/budget.history';
import { Id } from 'src/entity/user';
import {
  BettingRepositoryInterface,
  CreateBetting,
  CreateBettingDetail,
} from 'src/repository/betting.repository';
import { BudgetHistoryRepositoryInterface } from 'src/repository/budget.history.repository';
import { BudgetRepositoryInterface } from 'src/repository/budget.repository';
import { RaceRepositoryInterface } from 'src/repository/race.repository';

export class BettingService {
  constructor(
    private readonly br: BettingRepositoryInterface,
    private readonly bur: BudgetRepositoryInterface,
    private readonly bhr: BudgetHistoryRepositoryInterface,
    private readonly rr: RaceRepositoryInterface,
  ) {}

  async betting(
    userId: Id,
    raceId: Id,
    btds: CreateBettingDetail[],
  ): Promise<Betting> {
    const now = new Date();
    const canBettingDuration = await this.rr
      .findOne(raceId)
      .then((r) => r.canBattingDuration(now))
      .catch(() => false);

    if (!canBettingDuration) {
      return Promise.reject('締め切り時間を過ぎています');
    }

    const currentBudget = (await this.bur.findOne(userId)).budget;
    const totalBettingAmount = btds
      .map((btd) => btd.amount)
      .reduce((prev, current) => prev + current, 0);
    if (currentBudget < totalBettingAmount) {
      return Promise.reject('予算不足');
    }

    // update budget;
    const budget = new Budget(currentBudget - totalBettingAmount, userId);
    await this.bur.update(budget);

    // create betting;
    const createBetting = new CreateBetting(
      userId,
      raceId,
      totalBettingAmount,
      btds,
    );
    const createdBettng = await this.br.create(createBetting);

    // create budgetHistory;
    const bettingHistory = new BudgetHistory(
      userId,
      totalBettingAmount * -1,
      now,
      BudgetUpdater.BUY,
    );
    await this.bhr.create(bettingHistory);

    return Promise.resolve(createdBettng);
  }
  async findUserAll(userId: Id): Promise<Betting[]> {
    const bettingList = await this.br.findUserALl(userId);
    return Promise.resolve(bettingList);
  }
}
