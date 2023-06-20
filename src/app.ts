import express from "express";
import cors from "cors";
import userRouter from "./infra/userRouter";
import errorHandler from "./infra/middleware/errorException";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

export default app;
