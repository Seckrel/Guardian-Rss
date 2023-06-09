import { Router as ExpressRouter, Response, Request } from "express";

const router: ExpressRouter = ExpressRouter();

router.get("/", (request: Request, response: Response) => {
  console.log("route working");
  response.send("hello world");
});

router.get("/:slug", (request: Request, response: Response) => {
  console.log("route working");
  const slug: string = request.params.slug;
  response.send(`slug = ${slug}`);
});

export { router as guardianRouter };
