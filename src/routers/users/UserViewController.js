module.exports = class UserViewController {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async handle(req, res) {
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
};
