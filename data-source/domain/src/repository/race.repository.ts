import { Id } from 'src/entity/user';
import { RepositoryInterface } from './repository';
import { Race } from 'src/entity/race';

export abstract class RaceRepositoryInterface extends RepositoryInterface<Race> {
  abstract findOne(rId: Id): Promise<Race>;
}
