import { Id, User } from 'src/entity/user';
import { UserRepositoryInterface } from 'src/repository/user.repository';

export class UserSevice {
  constructor(private readonly ur: UserRepositoryInterface) {}
  async findOne(userId: Id): Promise<User> {
    const user = await this.ur.findOne(userId);
    return Promise.resolve(user);
  }
  async updateLevarage(userId: Id, leverage: number): Promise<User> {
    const currentUser = await this.ur.findOne(userId);
    try {
      currentUser.updateLeverage(leverage);
    } catch (error) {
      Promise.reject(error);
    }
    const updatedUser = this.ur.update(currentUser);
    return Promise.resolve(updatedUser);
  }
}
