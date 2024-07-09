import { Id } from 'src/entity/user';
import { RepositoryInterface } from './repository';
import { GithubUser } from 'src/entity/github.user';

export abstract class GithubUserRepositoryInterface extends RepositoryInterface<
  GithubUser,
  GithubUser
> {
  abstract findOne(userId: Id): Promise<GithubUser>;
}
