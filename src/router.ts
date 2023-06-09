import { Express, Router as ExpressRouter } from "express";
import { guardianRSSFeedController } from "./controller/RSSFeedController";

class Router {
  private router: ExpressRouter;

  constructor() {
    console.log("this is working");
    this.router = ExpressRouter();
    this.initializeRoutes();
  }
  initializeRoutes = () => {
    this.router.get("/", guardianRSSFeedController);
  }

  getRoutes = () => {
    return this.router;
  }
}

export default Router;
