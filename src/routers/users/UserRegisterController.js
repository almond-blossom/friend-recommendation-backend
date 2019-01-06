module.exports = class UserRegisterController {
  /**
   * @param {RegisterService} registerService
   */
  constructor(registerService) {
    this.registerService = registerService;
  }

  async handle(req, res) {
    const {
      id,
      pass,
      name,
      code,
    } = req.body;
    const result = await this.registerService.registerUser(id, pass, name, code);
    res.sendStatus(result ? 200 : 400);
  }
};
