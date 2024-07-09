import { Betting, BettingResult, BettingType } from 'src/entity/betting';
import { RepositoryInterface } from './repository';
import { Id } from 'src/entity/user';

export class CreateBetting {
  constructor(
    public userId: Id,
    public raceId: Id,
    public totalAmount: number,
    public bettingDetails: CreateBettingDetail[],
  ) {}
}

export class CreateBettingDetail {
  constructor(
    public amount: number,
    public bettingType: BettingType,
    public horse1: number,
    public horse2: number,
    public horse3: number,
    public result: BettingResult,
  ) {}
}

export abstract class BettingRepositoryInterface extends RepositoryInterface<
  Betting,
  CreateBetting
> {
  abstract findUserALl(userId: Id): Promise<Betting[]>;
  abstract new(userId: Id);
}
