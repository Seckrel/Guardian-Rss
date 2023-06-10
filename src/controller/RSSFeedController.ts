import { Request, Response } from "express";
import { kebabCaseValidator } from "@validators/paramsValidator";
import { fetchJSONRSSFeed, parseJSONToXML } from "@services/guardianRSSService";

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
  response.contentType("application/xml");
  response.status(guardianRSSFeed?.status).send((await rssXMLFeed).toString());
};
