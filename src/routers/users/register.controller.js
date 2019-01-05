const service = require('./register.service');

module.exports = async (req, res) => {
  const {
    id,
    pass,
    name,
    code,
  } = req.body;

  const result = await service.registerUser(id, pass, name, code);
  res.sendStatus(result ? 200 : 400);
};
