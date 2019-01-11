import { Controller, Request, Response } from '../../core/Controller';
import { RegisterService } from './RegisterService';

export class UserRegisterController implements Controller {
  private registerService: RegisterService;

  constructor(registerService: RegisterService) {
    this.registerService = registerService;
  }

  async handle(req: Request, res: Response) {
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
