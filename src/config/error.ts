import { CustomError } from "ts-custom-error";

export class HttpException extends Error {
  statusCode?: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export const badRequestException = (message = "400 Bad Request"): HttpException => {
  return new HttpException(400, message);
};

export const unauthorizedException = (message = "401 Unauthorized"): HttpException => {
  return new HttpException(401, message);
};

export const forbiddenException = (message = "403 Forbidden"): HttpException => {
  return new HttpException(403, message);
};

export const internalErrorException = (message = "500 Internal Error"): HttpException => {
  return new HttpException(500, message);
};

export class HttpError extends CustomError {
  public constructor(public code: number, message?: string) {
    super(message);
  }
}
