import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

const internalErrorHandlerMiddleware: ErrorRequestHandler = (
  err,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(err);
  response.status(err.status || 500);

  response.json({
    error: {
      message: err.message || "Internal Server Error",
    },
  });
};

export default internalErrorHandlerMiddleware
