import { Betting } from 'src/entity/betting';
import { RepositoryInterface } from './repository';

export abstract class BettingRepositoryInterface extends RepositoryInterface<Betting> {}
