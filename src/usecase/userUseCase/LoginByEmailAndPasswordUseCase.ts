import { User } from "../../domain/user/UserEntity";
import { UserRepository } from "../../infra/repositories/UserRepository";

export class LoginByEmailAndPasswordUseCase {
  constructor(private readonly authRepository: UserRepository) {
    this.authRepository = new UserRepository();
  }

  public async execute(email: string, password: string): Promise<User["user"] | null> {
    return await this.authRepository.getUser(email, password);
  }
}
