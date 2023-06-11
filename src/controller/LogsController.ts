import { Request, Response, RequestHandler } from "express";
import { getLogs } from "@services/LogsService";

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
  level: string;
};

export const listLogs: RequestHandler<
  Params,
  ResBody,
  ReqBody,
  ReqQuery
> = async (request: Request, response: Response) => {
  const level: string = (request.query.level as string) || "";
  const orderBy: string = (request.query.orderBy as string) || "id";
  const order: string = (request.query.order as string) || "asc";

  if (order !== "asc" && order !== "desc") {
    response.status(400).json({ error: "Order must be either asc or desc" });
  }

  try {
    const logQuery = await getLogs(level, orderBy, order);
    if (logQuery.length === 0) {
      response.status(404).json({ error: "Logs Not Found" });
      return;
    }
    response.status(200).json(logQuery);
  } catch (err) {
    response.status(400).json({ error: `${err}` });
  }
};
