import { Request, Response, NextFunction } from "express";
import { kebabCaseValidator } from "@validators/ParamsValidator";
import { redisClient } from "@config-db";

const cacheReturnSectionBasedRSS = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  /**
   * Middleware that uses section name slug as key to check if related RSS feed is in the cache memory
   */

  const sectionName: string = request.params.slug;

  const rssFeedForSection = await redisClient?.get(sectionName);

  if (rssFeedForSection !== null) {
    console.log("cache hit");
    response.contentType("application/xml");
    response.send(rssFeedForSection?.toString());
    return;
  } else {
    console.log("cache miss");
    next();
  }
};

const kebabCaseQueryParamsValidation = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  /**
   * Middleware to validate if section name slug is in kebab-case
   */
  const sectionName: string = request.params.slug;

  if (!kebabCaseValidator(sectionName)) {
    response
      .status(400)
      .json({ error: "Please Provide Section Name in kebab-case" });
    return;
  } else {
    next();
  }
};

export { cacheReturnSectionBasedRSS, kebabCaseQueryParamsValidation };
