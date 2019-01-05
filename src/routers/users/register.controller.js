module.exports = registerService => async (req, res) => {
  const {
    id,
    pass,
    name,
    code,
  } = req.body;

  const result = await registerService.registerUser(id, pass, name, code);
  res.sendStatus(result ? 200 : 400);
};
