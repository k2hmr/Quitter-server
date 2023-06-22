import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class LoginByEmailAndPasswordUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(userInfo: { email: string; password: string }): Promise<User> {
    return await this.userRepository.find({ email: userInfo.email, password: userInfo.password });
  }
}
