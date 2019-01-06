const createCode = require('../../utils/create-code');

module.exports = class UniqueCodeService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  /**
   * @param {string} code
   */
  async $findCode(code) {
    const user = await this.usersRepository.findUserByCode(code);
    if (user) return false;
    return code;
  }

  /**
   * @param {string} code
   */
  async $findUser(code) {
    return !code ? this.$findUser(await this.$findCode(createCode())) : code;
  }

  /**
   * @return {Promise<string>}
   */
  // eslint-disable-next-line class-methods-use-this
  async create() {
    return this.$findUser();
  }
};
