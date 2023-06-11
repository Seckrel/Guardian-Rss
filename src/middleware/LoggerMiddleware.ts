import { Request, Response, NextFunction } from "express";
import { createLogger, format } from "winston";
import PostgresTransport from "../utils/PostgresTransport";

const appLoggerMiddleWare = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  /**
   * Middleware to log each request/response made to the server
   */

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
  const requestIPAddress = request.ip;

  // addd more inforation to meta-data
  logger.defaultMeta = {
    method: requestMethod,
    originalUrl: uri,
    requestIPAddress: requestIPAddress,
  };

  // custom classification of log based on response status code
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
