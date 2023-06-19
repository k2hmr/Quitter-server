import { Router } from "express";
import { verifyToken } from "./middleware/verifyToken";
import { UserController } from "../interfaces/controller/UserController";
import { UserRepository } from "../domain/user/UserRepository";

const userRepository = new UserRepository();
const userController = new UserController(userRepository);

const router = Router();

router.post("/register", verifyToken, userController.register);

router.post("/login", verifyToken, userController.login);

router.get("/users", userController.fetchAllUsers);

export default router;
