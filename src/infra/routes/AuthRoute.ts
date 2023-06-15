import { verifyToken } from "infra/middleware/verifyToken";
import { AuthController } from "../../usecase/controllers/AuthController";
import { Router } from "express";

const router = Router();

router.post("/register", verifyToken, AuthController.register);
router.post("/login", verifyToken, AuthController.login);

export default router;
