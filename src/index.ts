import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { guardianRouter } from "@routers/GuardianRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use("/v1/rss-feed", guardianRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
