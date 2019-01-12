import { Router } from 'express';
import { UserRepository } from '../../repositories/UserRepository';
import { TemporaryUserRepository } from '../../repositories/TemporaryUserRepository';
import { RegisterService } from './RegisterService';
import { UniqueCodeService } from './UniqueCodeService';
import { UserRegisterController } from './UserRegisterController';
import { UserViewController } from './UserViewController';

export default () => {
  const router = Router();
  const userRepository = new TemporaryUserRepository();
  const uniqueCodeService = new UniqueCodeService(userRepository);
  const registerService = new RegisterService(userRepository, uniqueCodeService);
  const registerController = new UserRegisterController(registerService);
  const viewController = new UserViewController(userRepository);

  router.post('/users', (req, res) => registerController.handle(req, res));
  router.get('/users/:id', (req, res) => viewController.handle(req, res));
  return router;
};
