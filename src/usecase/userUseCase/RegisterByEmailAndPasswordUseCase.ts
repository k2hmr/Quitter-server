import { User } from "domain/user/UserEntity";
import { IUserRepository } from "../../domain/user/IUserRepository";

export class RegisterByEmailAndPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(user: { name: string; email: string; password: string }): Promise<User> {
    return await this.userRepository.create(user);
  }
}
