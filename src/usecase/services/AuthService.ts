import { User } from "@prisma/client";
import { AuthRepository } from "../../infra/repositories/AuthRepository";

export default class AuthService {
  private authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async register(name: string, email: string, password: string): Promise<void> {
    await this.authRepository.createUser(name, email, password);
  }

  async login(email: string, password: string): Promise<User | null> {
    return await this.authRepository.getUser(email, password);
  }
}
