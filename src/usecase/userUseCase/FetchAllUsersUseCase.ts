import { User } from "../../domain/user/UserEntity";
import { UserRepository } from "../../infra/repositories/UserRepository";

export class FetchAllUsersUseCase {
  constructor(private readonly authRepository: UserRepository) {
    this.authRepository = new UserRepository();
  }
  public async execute(): Promise<User["user"][] | null> {
    return await this.authRepository.getAllUser();
  }
}
