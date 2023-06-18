import { User } from "@prisma/client";
import { UserRepository } from "../../infra/repositories/UserRepository";

export class FetchAllUsersUseCase {
  constructor(private readonly authRepository: UserRepository) {
    this.authRepository = new UserRepository();
  }
  public async execute(): Promise<User[] | null> {
    return await this.authRepository.getAllUser();
  }
}
