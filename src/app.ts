import express from "express";
import cors from "cors";
import authRoute from "./infra/routes/AuthRoute";
import userController from "./usecase/controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(authRoute);
app.use("/users", userController);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

export default app;
