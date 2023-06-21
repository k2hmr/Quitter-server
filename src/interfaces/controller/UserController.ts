import { Request, Response } from "express";
import { RegisterByEmailAndPasswordUseCase } from "../../usecase/userUseCase/RegisterByEmailAndPasswordUseCase";
import { UserRepository } from "../../domain/user/UserRepository";
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
    try {
      await registerByEmailAndPasswordUseCase.execute(name, email, password);
      res.status(200).json({ message: "Register successful" });
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(this.userRepository);
    try {
      await loginByEmailAndPasswordUseCase.execute(email, password);
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }

  async fetchAllUsers(req: Request, res: Response) {
    const fetchAllUsersUseCase = new FetchAllUsersUseCase(this.userRepository);
    try {
      const users = await fetchAllUsersUseCase.execute();
      res.status(200).json({ users });
    } catch (error) {
      throw unauthorizedException(error.message);
    }
  }
}
