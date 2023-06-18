import { UserRepository } from "../../infra/repositories/UserRepository";

export class RegisterByEmailAndPasswordUseCase {
  constructor(private readonly authRepository: UserRepository) {
    this.authRepository = new UserRepository();
  }
  public async execute(name: string, email: string, password: string): Promise<void> {
    await this.authRepository.createUser(name, email, password);
  }
}
