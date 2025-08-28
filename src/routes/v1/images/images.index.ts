import * as imagesHandler from "../images/images.handlers.js";
import * as imagesRoutes from "../images/images.routes.js";
import { createRouter } from "../../../lib/create-app.js";

const router = createRouter().openapi(imagesRoutes.listFieldImagesForActiveSeason, imagesHandler.listFieldImagesForActiveSeason);

export default router;
