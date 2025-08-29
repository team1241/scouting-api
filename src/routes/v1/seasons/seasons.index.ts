import { createRouter } from "../../../lib/create-app.js";
import * as seasonHandlers from "../seasons/seasons.handlers.js";
import * as seasonRoutes from "../seasons/seasons.routes.js";

const router = createRouter()
  .openapi(seasonRoutes.listSeasons, seasonHandlers.listSeasons)
  .openapi(seasonRoutes.activeSeason, seasonHandlers.activeSeason);

export default router;
