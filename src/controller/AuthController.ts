import { Request, Response, Router } from "express";
import AuthService from "../usecase/AuthService";
import { verifyToken } from "../infra/middleware/verifyToken";

const router = Router();

router.post("/register", verifyToken, async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const authService = new AuthService();
  await authService.register(name, email, password);
  res.sendStatus(201);
});

router.post("/login", verifyToken, async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const authService = new AuthService();
  const user = await authService.login(email, password);
  res.json(user);
});

export default router;
