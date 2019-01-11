import { Controller, Request, Response } from '../../core/Controller';
import { UsersRepository } from '../../repositories/UsersRepository';

export class UserViewController implements Controller {
  private usersRepository: UsersRepository;

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.usersRepository.findUserById(id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      code: user.code,
      friends: user.friends,
      cash: user.cash,
    });
  }
}
