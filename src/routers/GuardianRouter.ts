import { Router as ExpressRouter } from "express";
import { getGuardianRSSFeed } from "@controller/RSSFeedController";

// middlewares
import {
  cacheReturnSectionBasedRSS,
  kebabCaseQueryParamsValidation,
} from "@middleware/RSSFeedMiddleware";
import { asyncHandler } from "@middleware/utils/AsyncHandler";

const router: ExpressRouter = ExpressRouter();

router.get(
  "/:slug",

  kebabCaseQueryParamsValidation,
  asyncHandler((req, res, next) => cacheReturnSectionBasedRSS(req, res, next)),

  getGuardianRSSFeed
); // to get XML feed from the Guardian JSON RSS API

export { router as guardianRouter };
