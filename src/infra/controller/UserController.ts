import { Request, Response } from "express";
import { RegisterByEmailAndPasswordUseCase } from "../../usecase/userUseCase/RegisterByEmailAndPasswordUseCase";
import { UserRepository } from "../repository/UserRepository";
import { LoginByEmailAndPasswordUseCase } from "../../usecase/userUseCase/LoginByEmailAndPasswordUseCase";
import { FetchAllUsersUseCase } from "../../usecase/userUseCase/FetchAllUsersUseCase";
import { unauthorizedException } from "../../exception/error";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const registerByEmailAndPasswordUseCase = new RegisterByEmailAndPasswordUseCase(this.userRepository);
    await registerByEmailAndPasswordUseCase.execute(name, email, password);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(this.userRepository);
    await loginByEmailAndPasswordUseCase.execute(email, password);
  }

  async fetchAllUsers(req: Request, res: Response) {
    const fetchAllUsersUseCase = new FetchAllUsersUseCase(this.userRepository);
    const users = await fetchAllUsersUseCase.execute();
  }
}
