import { UserRepository } from './UserRepository';
import { User } from '../models/User';

export class TemporaryUserRepository implements UserRepository {
  async findUserByCode(code: string): Promise<User> {
    return User.findOne({
      where: {
        code,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    return User.findOne({
      where: {
        id,
      },
    });
  }

  async insertUser(user: User): Promise<boolean> {
    const created = await User.create({
      id: user.id,
      pass: user.pass,
      name: user.name,
      code: user.code,
      friends: [],
      cash: 0,
    });
    return !!created;
  }

  async insertFriendByCode (code: string, newUserId: string): Promise<void> {
    const user = await this.findUserByCode(code);
    const newUser = await this.findUserById(newUserId);
    user.friends.push(newUser);
  }

  async updateCash(code: string, cash: number): Promise<void> {
    const user = await this.findUserByCode(code);
    user.cash += cash;
  }
}
