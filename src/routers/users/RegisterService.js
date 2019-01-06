const crypto = require('crypto');

module.exports = class RegisterService {
  constructor(usersRepository, uniqueCodeService) {
    this.usersRepository = usersRepository;
    this.uniqueCodeService = uniqueCodeService;
  }

  async registerUser(id, pass, name, code) {
    if (!id || !pass || !name) return false;
    const user = await this.usersRepository.findUserById(id);
    if (user) return false;
    const encrypted = crypto.createHash('md5').update(pass).digest('hex');
    const userCode = await this.uniqueCodeService.create();
    const newUser = await this.usersRepository.insertUser({
      id,
      pass: encrypted,
      name,
      code: userCode,
      cash: code ? 30 : 0,
    });
    if (!newUser) return false;

    if (code) {
      await this.usersRepository.insertFriendByCode(code, id);
      await this.usersRepository.updateCash(code, 30);
    }
    return true;
  }
};
