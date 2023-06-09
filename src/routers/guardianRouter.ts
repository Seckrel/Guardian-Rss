import { Router as ExpressRouter, Response, Request } from "express";
import { kebabCaseValidator } from "../validators/paramsValidator.js";

const router: ExpressRouter = ExpressRouter();

router.get("/", (request: Request, response: Response) => {
  console.log("route working");
  response.send("hello world");
});

router.get("/:slug", (request: Request, response: Response) => {
  const slug: string = request.params.slug;
  if (!kebabCaseValidator(slug)) {
    response
      .status(400)
      .send({ error: "Please Provide Section Name in kebab-case" });
  }
  response.send(`slug = ${slug}`);
});

export { router as guardianRouter };
