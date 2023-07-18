import express from "express";
import cors from "cors";
import { UserController } from "./infra/controller/UserController";
import { verifyToken } from "./infra/middleware/verifyToken";
import { ThemeController } from "./infra/controller/ThemeController";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

const userController = new UserController();
app.post("/register", verifyToken, userController.register);
app.post("/login", verifyToken, userController.login);
app.get("/users", userController.fetchAllUsers);

const themeController = new ThemeController();
app.get("/themes", verifyToken, themeController.fetchAllThemes);

export default app;
