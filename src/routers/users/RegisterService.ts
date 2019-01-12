import { UserRepository } from '../../repositories/UserRepository';
import { UniqueCodeService } from './UniqueCodeService';

const crypto = require('crypto');

export class RegisterService {
  private userRepository: UserRepository;
  private  uniqueCodeService: UniqueCodeService;

  constructor(userRepository: UserRepository, uniqueCodeService: UniqueCodeService) {
    this.userRepository = userRepository;
    this.uniqueCodeService = uniqueCodeService;
  }

  async registerUser(id: string, pass: string, name: string, code: string) {
    if (!id || !pass || !name) return false;
    const user = await this.userRepository.findUserById(id);
    if (user) return false;
    const encrypted = crypto.createHash('md5').update(pass).digest('hex');
    const userCode = await this.uniqueCodeService.create();
    const newUser = await this.userRepository.insertUser({
      id,
      name,
      pass: encrypted,
      code: userCode,
      friends: [],
      cash: code ? 30 : 0,
    });
    if (!newUser) return false;
    if (code) {
      await this.userRepository.insertFriendByCode(code, id);
      await this.userRepository.updateCash(code, 30);
    }
    return true;
  }
}
