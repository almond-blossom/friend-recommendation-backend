import RegisterService from './RegisterService';

export default class UserRegisterController {
  private registerService: RegisterService;

  constructor(registerService: RegisterService) {
    this.registerService = registerService;
  }

  async handle(req: any, res: any) {
    const {
      id,
      pass,
      name,
      code,
    } = req.body;
    const result = await this.registerService.registerUser(id, pass, name, code);
    res.sendStatus(result ? 200 : 400);
  }
}
