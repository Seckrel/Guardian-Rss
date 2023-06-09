import { Router as ExpressRouter, Response, Request } from "express";
import { kebabCaseValidator } from "../validators/paramsValidator.js";
import { getGuardianRSSFeedXML } from "@services/guardianRSSService.js";
// import { getGuardianRSSFeedXML } from "../services/guardianRSSService.js";

const router: ExpressRouter = ExpressRouter();

router.get("/", (request: Request, response: Response) => {
  console.log("route working");
  response.send("hello world");
});

router.get("/:slug", (request: Request, response: Response) => {
  const sectionName: string = request.params.slug;
  if (!kebabCaseValidator(sectionName)) {
    response
      .status(400)
      .send({ error: "Please Provide Section Name in kebab-case" });
  }
  const guardianRSSFeed = getGuardianRSSFeedXML(sectionName);
  console.log("working")
  response.send(`slug = ${sectionName}`);
});

export { router as guardianRouter };
