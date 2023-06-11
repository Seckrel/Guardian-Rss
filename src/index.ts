import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { guardianRouter } from "@routers/GuardianRouter";
import { appLoggerMiddleWare } from "@middleware/LoggerMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(appLoggerMiddleWare);

app.use("/v1/rss-feed", guardianRouter); // API that handles all The Guardian RSS feed related controllers


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
