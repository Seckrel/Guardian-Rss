import { Request, Response, NextFunction } from "express";
import expressWinston from "express-winston";
import { createLogger, format } from "winston";
import PostgresTransport from "../utils/PostgresTransport";

const appLoggerMiddleWare = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const postgresTransport = new PostgresTransport({ tableName: "logs" });

  const logger = createLogger({
    transports: [postgresTransport],
    format: format.combine(
      format.json(),
      format.timestamp(),
      format.metadata()
    ),
  });

  const oldStatus = response.status;

  const uri = request.originalUrl;
  const requestMethod = request.method;

  response.status = (code: number) => {
    if (code >= 100 && code < 400) {
      logger.info(
        `Informational Message: Status code ${code} for ${requestMethod} ${uri}`
      );
    }
    if (code >= 400 && code < 500) {
      logger.warn(
        `Warning Message: Status code ${code} for ${requestMethod} ${uri}`
      );
    }
    if (code >= 500) {
      logger.error(
        `Error Message: Status code ${code} for ${requestMethod} ${uri}`
      );
    }
    return oldStatus.apply(response, [code]);
  };

  next();
};

export { appLoggerMiddleWare };
