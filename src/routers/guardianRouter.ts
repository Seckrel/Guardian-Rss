import { Router as ExpressRouter, Response, Request } from "express";
import { getGuardianRSSFeed } from "@controller/RSSFeedController";

// middlewares
import {
  cacheReturnSectionBasedRSS,
  kebabCaseQueryParamsValidation,
} from "@middleware/RSSFeedMiddleware";
import { asyncHandler } from "@middleware/utils/AsyncHandler";

const router: ExpressRouter = ExpressRouter();

router.get("/", (request: Request, response: Response) => {
  response.send("hello world");
});

router.get(
  "/:slug",

  kebabCaseQueryParamsValidation,
  asyncHandler((req, res, next) => cacheReturnSectionBasedRSS(req, res, next)),

  getGuardianRSSFeed
);

export { router as guardianRouter };
