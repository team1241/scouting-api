import { createRouter } from "../../../lib/create-app.js";
import * as imagesHandler from "../images/images.handlers.js";
import * as imagesRoutes from "../images/images.routes.js";

const router = createRouter().openapi(imagesRoutes.listFieldImagesForActiveSeason, imagesHandler.listFieldImagesForActiveSeason).openapi(imagesRoutes.getRobotImagesInYear, imagesHandler.getRobotImagesInYear);

export default router;
