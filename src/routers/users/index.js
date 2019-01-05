const express = require('express');
const registerUser = require('./register.controller');
const viewUser = require('./view.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/users', registerUser);
  router.get('/users/:id', viewUser);
  return router;
};
