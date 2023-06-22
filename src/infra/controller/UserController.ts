import { Request, Response } from "express";
import { RegisterByEmailAndPasswordUseCase } from "../../usecase/userUseCase/RegisterByEmailAndPasswordUseCase";
import { UserRepository } from "../repository/UserRepository";
import { LoginByEmailAndPasswordUseCase } from "../../usecase/userUseCase/LoginByEmailAndPasswordUseCase";
import { FetchAllUsersUseCase } from "../../usecase/userUseCase/FetchAllUsersUseCase";

export class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const registerByEmailAndPasswordUseCase = new RegisterByEmailAndPasswordUseCase(userRepository);
    await registerByEmailAndPasswordUseCase.execute({ name, email, password });
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = new UserRepository();
    const loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(userRepository);
    await loginByEmailAndPasswordUseCase.execute({ email, password });
  }

  async fetchAllUsers(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const fetchAllUsersUseCase = new FetchAllUsersUseCase(userRepository);
    await fetchAllUsersUseCase.execute();
  }
}
