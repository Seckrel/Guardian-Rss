import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import swaggerDocument from "./swagger.json";


const swaggerDocs = (app: Express) => {

  app.use("/api-docs", swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerDocument))
};

export default swaggerDocs;
