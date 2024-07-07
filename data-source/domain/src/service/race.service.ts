import { Race } from 'src/entity/race';
import { Id } from 'src/entity/user';
import { RaceRepositoryInterface } from 'src/repository/race.repository';

export class RaceService {
  constructor(private readonly rr: RaceRepositoryInterface) {}

  async findCurrentRaceId(): Promise<Race[]> {
    const thisWeekRaces = await this.rr.findThisWeekRaces();
    return Promise.resolve(thisWeekRaces);
  }
  async findRace(raceId: Id): Promise<Race> {
    const race = await this.rr.findOne(raceId);
    return Promise.resolve(race);
  }
}
