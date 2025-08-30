import { createRouter } from "../../../lib/create-app.js";
import * as pitScoutingHandlers from "../pit-scouting/pit-scouting.handlers.js";
import * as pitScoutingRoutes from "../pit-scouting/pit-scouting.routes.js";

const router = createRouter().openapi(
  pitScoutingRoutes.getPitScoutingReportsForTeam,
  pitScoutingHandlers.getPitScoutingReportsForTeam,
);

export default router;
