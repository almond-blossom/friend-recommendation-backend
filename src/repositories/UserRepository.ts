import { User } from '../models/User';

export interface UserRepository {
  findUserByCode(code: string): Promise<User>;
  findUserById(id: string): Promise<User>;
  insertUser(user: User): Promise<number>;
  insertFriendByCode (code: string, newUserId: string): Promise<void>;
  updateCash(code: string, cash: number): Promise<void>;
}
