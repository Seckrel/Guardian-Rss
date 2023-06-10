import { Router as ExpressRouter, Response, Request } from "express";
import { getGuardianRSSFeed } from "@controller/RSSFeedController";

const router: ExpressRouter = ExpressRouter();

router.get("/", (request: Request, response: Response) => {
  console.log("route working");
  response.send("hello world");
});

router.get("/:slug", getGuardianRSSFeed);

export { router as guardianRouter };
