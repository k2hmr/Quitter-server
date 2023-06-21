import { auth, DecodedIdToken } from "../../config/firebase";
import express, { NextFunction } from "express";
import { internalErrorException, unauthorizedException } from "../../exception/error";
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
      return next();
    }
    return next(unauthorizedException("Un authorize"));
  } catch (e) {
    return next(internalErrorException("Internal error"));
  }
};
