import { Betting, BettingDetail } from 'src/entity/betting';
import { Budget } from 'src/entity/budget';
import { BudgetHistory, BugetUpdater } from 'src/entity/budget.history';
import { Id } from 'src/entity/user';
import { BettingRepositoryInterface } from 'src/repository/betting.repository';
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
    btds: BettingDetail[],
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
    await this.bur.create(budget);

    // create betting;
    const betting = new Betting(userId, raceId, totalBettingAmount, btds);
    const createdBettng = await this.br.create(betting);

    // create budgetHistory;
    const bettingHistory = new BudgetHistory(
      userId,
      totalBettingAmount * -1,
      now,
      BugetUpdater.BUY,
    );
    await this.bhr.create(bettingHistory);

    return Promise.resolve(createdBettng);
  }
}
