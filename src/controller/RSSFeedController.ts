import { Request, Response } from "express";
import { kebabCaseValidator } from "@validators/ParamsValidator";
import { fetchJSONRSSFeed, parseJSONToXML } from "@services/GuardianRSSService";
import { redisClient } from "@config-db";
import dotenv from "dotenv";

dotenv.config();

export const getGuardianRSSFeed = async (
  request: Request,
  response: Response
) => {
  const sectionName: string = request.params.slug;

  if (!kebabCaseValidator(sectionName)) {
    response
      .status(400)
      .json({ error: "Please Provide Section Name in kebab-case" });
  }

  const guardianRSSFeed = await fetchJSONRSSFeed(sectionName);

  if (!guardianRSSFeed?.ok) {
    response.status(guardianRSSFeed?.status).json({ error: "error message" });
  }
  const rssXMLFeed = parseJSONToXML(guardianRSSFeed.rssFeedJSON);

  const rssXMLStr = (await rssXMLFeed).toString();

  const cacheExTime =
    parseInt(process.env.GUARDIAN_SECTION_CACHE_EX_TIME_MIN || "10") * 60;
  await redisClient?.setEx(sectionName, cacheExTime * 60, rssXMLStr);

  response.contentType("application/xml");
  response.status(guardianRSSFeed?.status).send(rssXMLStr);
};
