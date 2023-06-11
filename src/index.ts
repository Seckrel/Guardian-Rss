import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { guardianRouter } from "@routers/GuardianRouter";
import { appLoggerMiddleWare } from "@middleware/LoggerMiddleware";
import internalErrorHandlerMiddleware from "@middleware/ErrorsHandlerMiddleware";
import swaggerDocs from "./swagger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(appLoggerMiddleWare);
app.use(internalErrorHandlerMiddleware);

app.use("/v1/rss-feed", guardianRouter); // API that handles all The Guardian RSS feed related controllers

// use only in debug mode (dev mode)
if (process.env.DEBUG === "1") {
  swaggerDocs(app);
}

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
