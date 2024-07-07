import { BudgetHistory, BugetUpdater } from 'src/entity/budget.history';
import { CommitHistory } from 'src/entity/commit.history';
import { Id } from 'src/entity/user';
import { BudgetHistoryRepositoryInterface } from 'src/repository/budget.history.repository';
import { BudgetRepositoryInterface } from 'src/repository/budget.repository';
import { CommitHistoryRepositoryInterface } from 'src/repository/commit.history.repository';
import { GithubRepositoryInterface } from 'src/repository/github.repository';
import { GithubUserRepositoryInterface } from 'src/repository/github.user.repository';
import { UserRepositoryInterface } from 'src/repository/user.repository';

export class CommitHistoryService {
  constructor(
    private readonly chr: CommitHistoryRepositoryInterface,
    private readonly ghur: GithubUserRepositoryInterface,
    private readonly ghr: GithubRepositoryInterface,
    private readonly ur: UserRepositoryInterface,
    private readonly bhr: BudgetHistoryRepositoryInterface,
    private readonly br: BudgetRepositoryInterface,
  ) {}

  async findUserHistory(userId: Id): Promise<CommitHistory[]> {
    const history = await this.chr.findUserHistory(userId);
    return Promise.resolve(history);
  }

  async fetchHistory(userId: Id, now: Date): Promise<void> {
    const user = await this.ur.findOne(userId);
    const githubUser = await this.ghur.findOne(userId);
    const latestCommitHistoryDate = await this.chr
      .findLatest(userId)
      .then((ch) => ch.createdAt);

    const count = await this.ghr.fetch(
      githubUser,
      now,
      latestCommitHistoryDate,
    );
    const newCommitHistory = new CommitHistory(userId, count, now);
    // create commit history
    await this.chr.create(newCommitHistory);
    if (count === 0) {
      return;
    }

    // update budget
    const currentBudget = await this.br.findOne(userId);
    const diff = Math.floor(count * user.leverage);
    currentBudget.budget = currentBudget.budget + diff;
    await this.br.update(currentBudget);

    // create budget history
    const newBudgetHistory = new BudgetHistory(
      userId,
      diff,
      now,
      BugetUpdater.COMMIT,
    );
    await this.bhr.create(newBudgetHistory);
    return;
  }
}
