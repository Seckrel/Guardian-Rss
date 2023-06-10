import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { guardianRouter } from "./routers/guardianRouter.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// app.get("/", (req, res) => {
//   console.log("working");
//   return res.send({ msg: "hello" });
// });

app.use("/v1/rss-feed", guardianRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
