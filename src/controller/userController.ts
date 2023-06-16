import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { verifyToken } from "../infra/middleware/verifyToken";

const prisma = new PrismaClient();
const router = Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
});

router.post("/", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await prisma.user.create({
    data: { name, email, password },
  });
  res.json({ user });
});

export default router;
