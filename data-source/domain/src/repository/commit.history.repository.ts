import { CommitHistory } from 'src/entity/commit.history';
import { RepositoryInterface } from './repository';

export abstract class CommitHistoryRepositoryInterface extends RepositoryInterface<CommitHistory> {}
