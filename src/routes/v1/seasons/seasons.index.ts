
import * as seasonHandlers from "../seasons/seasons.handlers.js";
import * as seasonRoutes from "../seasons/seasons.routes.js";
import { createRouter } from "../../../lib/create-app.js";

const router = createRouter()
  .openapi(seasonRoutes.listSeasons, seasonHandlers.listSeasons)
  .openapi(seasonRoutes.activeSeason, seasonHandlers.activeSeason);

export default router;
