import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
// import Router from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  console.log("working");
  return res.send({ msg: "hello" });
});

// try {
//   const router = new Router();

//   app.use("/v1", router.getRoutes);
// } catch (err) {
//   console.log("error", err);
// }

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
