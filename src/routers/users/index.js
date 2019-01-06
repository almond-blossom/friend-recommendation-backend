const express = require('express');
const usersRepository = require('../../repositories/users');
const UniqueCodeService = require('./UniqueCodeService');
const RegisterService = require('./RegisterService');
const UserRegisterController = require('./UserRegisterController');
const UserViewController = require('./UserViewController');

module.exports = () => {
  const router = express.Router();
  const uniqueCodeService = new UniqueCodeService(usersRepository);
  const registerService = new RegisterService(usersRepository, uniqueCodeService);
  const registerController = new UserRegisterController(registerService);
  const viewController = new UserViewController(usersRepository);

  router.post('/users', (req, res) => registerController.handle(req, res));
  router.get('/users/:id', (req, res) => viewController.handle(req, res));
  return router;
};
