import { UserRepository } from './UserRepository';
import { User } from '../models/User';

export class TemporaryUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: 'test',
      pass: '098f6bcd4621d373cade4e832627b4f6',
      name: '테스트',
      code: 'AA',
      friends: [],
      cash: 0,
    },
  ];

  async findUserByCode(code: string): Promise<User> {
    return this.users.find(user => user.code === code);
  }

  async findUserById(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async insertUser(user: User): Promise<number> {
    return this.users.push({
      id: user.id,
      pass: user.pass,
      name: user.name,
      code: user.code,
      friends: user.friends || [],
      cash: user.cash || 0,
    });
  }

  async insertFriendByCode (code: string, newUserId: string): Promise<void> {
    const user = await this.findUserByCode(code);
    user.friends.push(newUserId);
  }

  async updateCash(code: string, cash: number): Promise<void> {
    const user = await this.findUserByCode(code);
    user.cash += cash;
  }
}
