import { UserRepository } from '../../repositories/UserRepository';
import { RandomCodeGenerator } from '../../utils/RandomCodeGenerator';

export class UniqueCodeService {
  private userRepository: UserRepository;
  private randomCodeGenerator: RandomCodeGenerator;

  constructor(userRepository: UserRepository) {
    this.randomCodeGenerator = new RandomCodeGenerator();
    this.userRepository = userRepository;
  }

  /**
   * @param code
   * @return if code not exists, returns empty string
   */
  private async findCode(code: string): Promise<string> {
    const user = await this.userRepository.findUserByCode(code);
    if (user) return '';
    return code;
  }

  private async findUser(code?: string): Promise<string> {
    return !code ? this.findUser(await this.findCode(this.randomCodeGenerator.generate())) : code;
  }

  async create(): Promise<string> {
    return this.findUser();
  }
}
