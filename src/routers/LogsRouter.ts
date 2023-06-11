import { Router as ExpressRouter } from "express";
import { listLogs } from "@controller/LogsController";

const router: ExpressRouter = ExpressRouter();

router.get("/", listLogs);

export { router as logsRouter };
