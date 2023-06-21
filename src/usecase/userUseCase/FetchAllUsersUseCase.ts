import { IUserRepository } from "../../interfaces/IUserRepository";
import { User } from "../../domain/user/UserEntity";

export class FetchAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async execute(): Promise<User[] | null> {
    return await this.userRepository.findAll();
  }
}
