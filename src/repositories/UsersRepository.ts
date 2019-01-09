interface User {
  id: String;
  pass: String;
  name: String;
  code: String;
  friends: String[];
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

  async findUserById(id: String) {
    return this.users.find(user => user.id === id);
  }

  async findUserByCode(code: String) {
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

  async insertFriendByCode (code: String, newUserId: String) {
    const user = await this.findUserByCode(code);
    user.friends.push(newUserId);
  }

  async updateCash(code: String, cash: number) {
    const user = await this.findUserByCode(code);
    user.cash += cash;
  }

}
