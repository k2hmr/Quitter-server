import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class LoginByEmailAndPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(email: string, password: string): Promise<User | null> {
    return await this.userRepository.find(email, password);
  }
}
