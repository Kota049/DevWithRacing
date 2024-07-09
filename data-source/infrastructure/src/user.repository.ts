import { Id, User } from '@domain/entity/user';
import {
  CreateUser,
  UserRepositoryInterface,
} from '@domain/repository/user.repository';
import { PrismaService } from './prisma.service';

export abstract class UserRepository implements UserRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  async create(t: CreateUser): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        leverage: t.leverage,
      },
    });
    const res = new User(new Id(user.id), user.leverage);
    return Promise.resolve(res);
  }
  async update(t: User): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id: t.userId.value },
      data: { leverage: t.leverage },
    });
    const res = new User(new Id(user.id), user.leverage);
    return Promise.resolve(res);
  }
  async findOne(userId: Id): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId.value },
    });
    const res = new User(new Id(user.id), user.leverage);
    return Promise.resolve(res);
  }
}
