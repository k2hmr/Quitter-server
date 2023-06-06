import express from "express";
import cors from "cors";
import useController from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", useController);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

export default app;
