import UsersRepository from '../../repositories/UsersRepository';
import UniqueCodeService from './UniqueCodeService';

const crypto = require('crypto');

export default class RegisterService {
  private usersRepository: UsersRepository;
  private  uniqueCodeService: UniqueCodeService;

  constructor(usersRepository: UsersRepository, uniqueCodeService: UniqueCodeService) {
    this.usersRepository = usersRepository;
    this.uniqueCodeService = uniqueCodeService;
  }

  async registerUser(id: string, pass: string, name: string, code: string) {
    if (!id || !pass || !name) return false;
    const user = await this.usersRepository.findUserById(id);
    if (user) return false;
    const encrypted = crypto.createHash('md5').update(pass).digest('hex');
    const userCode = await this.uniqueCodeService.create();
    const newUser = await this.usersRepository.insertUser({
      id,
      name,
      pass: encrypted,
      code: userCode,
      friends: [],
      cash: code ? 30 : 0,
    });
    if (!newUser) return false;
    if (code) {
      await this.usersRepository.insertFriendByCode(code, id);
      await this.usersRepository.updateCash(code, 30);
    }
    return true;
  }
}
