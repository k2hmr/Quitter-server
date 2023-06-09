import { DecodedIdToken } from "firebase-admin/auth";
import auth from "../../config/firebase-config";
import express, { NextFunction } from "express";
// express.Requestに拡張でuser型を追加
declare global {
  namespace Express {
    interface Request {
      user?: DecodedIdToken;
    }
  }
}

export const verifyToken = async (req: express.Request, res: express.Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const decodeValue = await auth.verifyIdToken(token);
    if (decodeValue) {
      req.user = decodeValue;
      console.log(req.user);

      return next();
    }
    return res.json({ message: "Un authorize" });
  } catch (e) {
    return res.json({ message: "Internal Error" });
  }
};
