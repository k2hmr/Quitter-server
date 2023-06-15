import { Request, Response } from "express";
import AuthService from "../services/AuthService";

export const AuthController = {
  async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    const authService = new AuthService();
    await authService.register(name, email, password);
    res.sendStatus(201);
  },

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const authService = new AuthService();
    const user = await authService.login(email, password);
    res.json(user);
  },
};
