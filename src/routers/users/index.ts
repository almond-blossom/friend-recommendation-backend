import { Router } from 'express';
import UsersRepository from '../../repositories/UsersRepository';
import RegisterService from './RegisterService';
import UniqueCodeService from './UniqueCodeService';
import UserRegisterController from './UserRegisterController';
import UserViewController from './UserViewController';

export default () => {
  const router = Router();
  const usersRepository = new UsersRepository();
  const uniqueCodeService = new UniqueCodeService(usersRepository);
  const registerService = new RegisterService(usersRepository, uniqueCodeService);
  const registerController = new UserRegisterController(registerService);
  const viewController = new UserViewController(usersRepository);

  router.post('/users', (req, res) => registerController.handle(req, res));
  router.get('/users/:id', (req, res) => viewController.handle(req, res));
  return router;
};
