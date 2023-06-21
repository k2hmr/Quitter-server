export class HttpException extends Error {
  statusCode?: number;
  message: string;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
  }
}

export const unauthorizedException = (message = "401 Unauthorized"): HttpException => {
  throw new HttpException(401, message);
};

export const forbiddenException = (message = "403 Forbidden"): HttpException => {
  throw new HttpException(403, message);
};

export const unprocessableEntityException = (message = "422 Unprocessable Entity"): HttpException => {
  throw new HttpException(422, message);
};

export const internalErrorException = (message = "500 Internal Error"): HttpException => {
  throw new HttpException(500, message);
};
