import { HttpException } from "../../config/error";
import { Request, Response } from "express";

export default function errorHandler(err: HttpException, req: Request, res: Response): void {
  res.status(err.statusCode || 500).send(err.message);
}
