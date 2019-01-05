const repository = require('../../repositories/users');

module.exports = async (req, res) => {
  const { id } = req.params;
  const user = await repository.findUserById(id);
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
};
