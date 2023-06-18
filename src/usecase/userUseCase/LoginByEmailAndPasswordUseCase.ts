import { User } from "@prisma/client";
import { UserRepository } from "../../infra/repositories/UserRepository";

export class LoginByEmailAndPasswordUseCase {
  constructor(private readonly authRepository: UserRepository) {
    this.authRepository = new UserRepository();
  }

  public async execute(email: string, password: string): Promise<User | null> {
    return await this.authRepository.getUser(email, password);
  }
}
