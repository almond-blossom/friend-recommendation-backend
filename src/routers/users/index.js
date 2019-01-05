const express = require('express');
const usersRepository = require('../../repositories/users');
const createUniqueCode = require('../../utils/create-code');
const registerService = require('./register.service');
const registerUser = require('./register.controller');
const viewUser = require('./view.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/users', registerUser(
    registerService(usersRepository, createUniqueCode),
  ));
  router.get('/users/:id', viewUser(usersRepository));
  return router;
};
