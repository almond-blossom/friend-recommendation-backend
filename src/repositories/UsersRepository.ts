interface User {
  id: string;
  pass: string;
  name: string;
  code: string;
  friends: string[];
  cash: number;
}

export default class UsersRepository {
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

  async findUserById(id: string) {
    return this.users.find(user => user.id === id);
  }

  async findUserByCode(code: string) {
    return this.users.find(user => user.code === code);
  }

  async insertUser(user: User) {
    return this.users.push({
      id: user.id,
      pass: user.pass,
      name: user.name,
      code: user.code,
      friends: user.friends || [],
      cash: user.cash || 0,
    });
  }

  async insertFriendByCode (code: string, newUserId: string) {
    const user = await this.findUserByCode(code);
    user.friends.push(newUserId);
  }

  async updateCash(code: string, cash: number) {
    const user = await this.findUserByCode(code);
    user.cash += cash;
  }

}
