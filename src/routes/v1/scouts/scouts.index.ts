import * as scoutHandlers from "../scouts/scouts.handlers.js";
import * as scoutRoutes from "../scouts/scouts.routes.js";
import { createRouter } from "../../../lib/create-app.js";

const router = createRouter().openapi(scoutRoutes.listScouts, scoutHandlers.listScouts).openapi(scoutRoutes.listCommentsForScout, scoutHandlers.listCommentsForScout);

export default router;
