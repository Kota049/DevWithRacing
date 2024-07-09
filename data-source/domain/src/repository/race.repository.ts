import { Id } from 'src/entity/user';
import { RepositoryInterface } from './repository';
import { Horse, Race } from 'src/entity/race';

export class CreateRace {
  constructor(
    public startAt: Date,
    public name: string,
    public horses: Horse[],
  ) {}
}

export abstract class RaceRepositoryInterface extends RepositoryInterface<
  Race,
  CreateRace
> {
  abstract findOne(rId: Id): Promise<Race>;
  abstract findThisWeekRaces(): Promise<Race[]>;
}
