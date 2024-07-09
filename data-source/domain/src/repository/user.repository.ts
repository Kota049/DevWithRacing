import { Id, User } from 'src/entity/user';
import { RepositoryInterface } from './repository';
export class CreateUser {
  public leverage: number;
}

export abstract class UserRepositoryInterface extends RepositoryInterface<
  User,
  CreateUser
> {
  abstract findOne(userId: Id): Promise<User>;
}
