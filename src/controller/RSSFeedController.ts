import { Request, Response } from "express";
import { kebabCaseValidator } from "@validators/paramsValidator";
import { fetchXMLRSSFeed } from "@services/guardianRSSService";

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

  const guardianRSSFeed = await fetchXMLRSSFeed(sectionName);

  if (!guardianRSSFeed?.ok) {
    response.status(guardianRSSFeed?.status).json({ error: "error message" });
  }
  response.status(guardianRSSFeed?.status).json({ message: "done" });
};
