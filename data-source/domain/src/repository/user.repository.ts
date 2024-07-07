import { User } from 'src/entity/user';
import { RepositoryInterface } from './repository';

export abstract class UserRepositoryInterface extends RepositoryInterface<User> {}
