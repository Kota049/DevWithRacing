import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BettingRepository } from './betting.repository';
import { BudgetRepository } from './budget.repository';
import { CommitHistoryRepository } from './commit.history.repository';
import { GithubClient } from './github.repository';
import { GithubUserRepository } from './github.user.repository';
import { RaceRepository } from './race.repository';
import { UserRepository } from './user.repository';
import { BudgetHistoryRepository } from './budget.history.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    BettingRepository,
    BudgetRepository,
    CommitHistoryRepository,
    GithubClient,
    GithubUserRepository,
    RaceRepository,
    UserRepository,
    BudgetHistoryRepository,
  ],
  controllers: [],
  providers: [],
  exports: [
    BettingRepository,
    BudgetRepository,
    CommitHistoryRepository,
    GithubClient,
    GithubUserRepository,
    RaceRepository,
    UserRepository,
    BudgetHistoryRepository,
  ],
})
export class InfraModule {}
