import { Betting } from 'src/entity/betting';
import { RepositoryInterface } from './repository';
import { Id } from 'src/entity/user';

export abstract class BettingRepositoryInterface extends RepositoryInterface<Betting> {
  abstract findUserALl(userId: Id): Promise<Betting[]>;
}
