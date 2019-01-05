const crypto = require('crypto');
const usersRepository = require('../../repositories/users');
const createUniqueCode = require('./create-unique-code');

const registerUser = async (id, pass, name, code) => {
  if (!id || !pass || !name) return false;
  const user = await usersRepository.findUserById(id);
  if (user) return false;
  const encrypted = crypto.createHash('md5').update(pass).digest('hex');
  const userCode = await createUniqueCode();
  const newUser = await usersRepository.insertUser({
    id,
    pass: encrypted,
    name,
    code: userCode,
    cash: code ? 30 : 0,
  });
  if (!newUser) return false;

  if (code) {
    await usersRepository.insertFriendByCode(code, id);
    await usersRepository.updateCash(code, 30);
  }
  return true;
};

module.exports = {
  registerUser,
};
