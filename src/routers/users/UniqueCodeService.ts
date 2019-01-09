import UsersRepository from '../../repositories/UsersRepository';
import RandomCodeGenerator from '../../utils/RandomCodeGenerator';

export default class UniqueCodeService {
  private usersRepository: UsersRepository;
  private randomCodeGenerator: RandomCodeGenerator;

  constructor(usersRepository: UsersRepository) {
    this.randomCodeGenerator = new RandomCodeGenerator();
    this.usersRepository = usersRepository;
  }

  /**
   * @param code
   * @return if code not exists, returns empty string
   */
  private async findCode(code: String): Promise<String> {
    const user = await this.usersRepository.findUserByCode(code);
    if (user) return '';
    return code;
  }

  private async findUser(code?: String): Promise<String> {
    return !code ? this.findUser(await this.findCode(this.randomCodeGenerator.generate())) : code;
  }

  async create(): Promise<String> {
    return this.findUser();
  }
}
