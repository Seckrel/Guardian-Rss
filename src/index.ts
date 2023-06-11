import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { guardianRouter } from "@routers/GuardianRouter";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
console.log(process.env.POSTGRES_URL)
app.use("/v1/rss-feed", guardianRouter); // API that handles all The Guardian RSS feed related controllers

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
