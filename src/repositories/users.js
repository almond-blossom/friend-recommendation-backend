const users = [
  {
    id: 'test',
    pass: '098f6bcd4621d373cade4e832627b4f6',
    name: '테스트',
    code: 'AA',
    friends: [],
    cash: 0,
  },
];

const findUserById = async id => (
  users.find(user => user.id === id)
);

const findUserByCode = async code => (
  users.find(user => user.code === code)
);

const insertUser = async user => users.push({
  id: user.id,
  pass: user.pass,
  name: user.name,
  code: user.code,
  friends: user.friends || [],
  cash: user.cash || 0,
});

const insertFriendByCode = async (code, newUserId) => {
  const user = await findUserByCode(code);
  user.friends.push(newUserId);
};

const updateCash = async (code, cash) => {
  const user = await findUserByCode(code);
  user.cash += cash;
};

module.exports = {
  findUserById,
  findUserByCode,
  insertUser,
  insertFriendByCode,
  updateCash,
};
