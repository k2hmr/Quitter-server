import { IUserRepository } from "../../domain/user/IUserRepository";

export class RegisterByEmailAndPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(name: string, email: string, password: string): Promise<void> {
    await this.userRepository.create(name, email, password);
  }
}
