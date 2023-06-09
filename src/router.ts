import { Express, Router as ExpressRouter } from "express";
import { guardianRSSFeedController } from "./controller/RSSFeedController";

class Router {
  readonly app: Express;
  readonly router: ExpressRouter;

  constructor(app: Express) {
    console.log("this is working");
    this.app = app;
    this.router = ExpressRouter();
  }

  guardianRssFeedRouter = () => {
    this.app.get("/:slug", guardianRSSFeedController);
  };

  setupRoutes = () => {
    this.app.use("/v1", this.router);
  };
}

export default Router;
