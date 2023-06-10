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
  /**
   * API that handles fetching JSON RSS feed of The Guardian and convert it into XML RSS feed
   *
   * @param request (HTTP Request)
   * @param Response (HTTP Response)
   * @returns
   */

  const sectionName: string = request.params.slug;

  if (!kebabCaseValidator(sectionName)) {
    response
      .status(400)
      .json({ error: "Please Provide Section Name in kebab-case" });
  }

  const guardianRSSFeed = await fetchJSONRSSFeed(sectionName); // fetching JSON RSS from The Guardian

  if (!guardianRSSFeed?.ok) {
    response
      .status(guardianRSSFeed?.status)
      .json({ error: `Section "${sectionName}" Not Found!!` });
    return;
  }

  const rssXMLFeed = parseJSONToXML(guardianRSSFeed.rssFeedJSON); // converting JSON to XML RSS feed

  const rssXMLStr = (await rssXMLFeed).toString();

  // cache only when guardian response is ok and results in JSON is non-empty
  if (guardianRSSFeed?.ok && guardianRSSFeed.rssFeedJSON.results?.length > 0) {
    const cacheExTime =
      parseInt(process.env.GUARDIAN_SECTION_CACHE_EX_TIME_MIN || "10") * 60;

    await redisClient?.setEx(sectionName, cacheExTime, rssXMLStr);
  }

  response.contentType("application/xml");
  response.status(200).send(rssXMLStr);
};
