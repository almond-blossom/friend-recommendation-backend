import { Controller, Request, Response } from '../../core/Controller';
import { UserRepository } from '../../repositories/UserRepository';

export class UserViewController implements Controller {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json({
      id: user.id,
      name: user.name,
      code: user.code,
      friends: user.friends || [],
      cash: user.cash,
    });
  }
}
