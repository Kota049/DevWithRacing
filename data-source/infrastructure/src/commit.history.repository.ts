import { CommitHistory } from 'src/entity/commit.history';
import { RepositoryInterface } from './repository';
import { Id } from 'src/entity/user';

export abstract class CommitHistoryRepositoryInterface extends RepositoryInterface<CommitHistory> {
  abstract findUserHistory(userId: Id): Promise<CommitHistory[]>;
  abstract findLatest(userId: Id): Promise<CommitHistory>;
}
