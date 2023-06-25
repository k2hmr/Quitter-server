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
    try {
      await registerByEmailAndPasswordUseCase.execute({ name, email, password });
      res.status(200).json({ message: "Register successfully" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const userRepository = new UserRepository();
    const loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(userRepository);
    try {
      await loginByEmailAndPasswordUseCase.execute({ email, password });
      res.status(200).json({ message: "Login successfully" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async fetchAllUsers(req: Request, res: Response) {
    const userRepository = new UserRepository();
    const fetchAllUsersUseCase = new FetchAllUsersUseCase(userRepository);
    try {
      await fetchAllUsersUseCase.execute();
      res.status(200).json({ message: "Fetch successfully" });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}
