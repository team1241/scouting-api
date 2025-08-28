import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import type { ListFieldImagesForActiveSeasonRoute } from "./images.routes.js";
import type { ScoutingAppRouteHandler } from "../../../lib/types.js";
import db from "../../../db/index.js";
import { fieldImages } from "../../../db/schema.js";

export const listFieldImagesForActiveSeason: ScoutingAppRouteHandler<ListFieldImagesForActiveSeasonRoute> = async (c) => {
  const activeSeason = await db.query.seasons.findFirst({ where: (seasons, { eq }) => eq(seasons.isActive, true) });

  if (!activeSeason) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const images = await db.query.fieldImages.findMany({ where: eq(fieldImages.seasonId, activeSeason!.id) });

  return c.json(images, HttpStatusCodes.OK);
};
