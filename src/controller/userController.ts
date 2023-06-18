import { Request, Response, Router } from "express";
import { verifyToken } from "../infra/middleware/verifyToken";
import { RegisterByEmailAndPasswordUseCase } from "../usecase/userUseCase/RegisterByEmailAndPasswordUseCase";
import { UserRepository } from "infra/repositories/UserRepository";
import { LoginByEmailAndPasswordUseCase } from "usecase/userUseCase/LoginByEmailAndPasswordUseCase";
import { FetchAllUsersUseCase } from "usecase/userUseCase/FetchAllUsersUseCase";

const router = Router();

router.post("/register", verifyToken, async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const authRepository = new UserRepository();
  const registerByEmailAndPasswordUseCase = new RegisterByEmailAndPasswordUseCase(authRepository);

  try {
    await registerByEmailAndPasswordUseCase.execute(name, email, password);
    res.status(200).json({ message: "Register successful" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/login", verifyToken, async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const authRepository = new UserRepository();
  const loginByEmailAndPasswordUseCase = new LoginByEmailAndPasswordUseCase(authRepository);
  try {
    await loginByEmailAndPasswordUseCase.execute(email, password);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  const authRepository = new UserRepository();
  const fetchAllUsersUseCase = new FetchAllUsersUseCase(authRepository);
  try {
    const users = await fetchAllUsersUseCase.execute();
    res.status(200).json({ users });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
