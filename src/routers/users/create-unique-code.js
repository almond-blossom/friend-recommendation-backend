const usersRepository = require('../../repositories/users');
const createCode = require('../../utils/create-code');

const findCode = async (code) => {
  const user = await usersRepository.findUserByCode(code);
  if (user) return false;
  return code;
};

const findUser = async code => (
  !code ? findUser(await findCode(createCode())) : code);

module.exports = async () => findUser();
