import type { ScoutingAppRouteHandler } from "../../../lib/types.js";
import type {
  GetRobotImagesInYearRoute,
  ListFieldImagesForActiveSeasonRoute,
} from "./images.routes.js";
import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";
import db from "../../../db/index.js";
import { fieldImages, pitScoutImages } from "../../../db/schema.js";

export const listFieldImagesForActiveSeason: ScoutingAppRouteHandler<
  ListFieldImagesForActiveSeasonRoute
> = async (c) => {
  const activeSeason = await db.query.seasons.findFirst({
    where: (seasons, { eq }) => eq(seasons.isActive, true),
  });

  if (!activeSeason) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCodes.NOT_FOUND,
    );
  }

  const images = await db.query.fieldImages.findMany({
    where: eq(fieldImages.seasonId, activeSeason!.id),
  });

  return c.json(images, HttpStatusCodes.OK);
};

export const getRobotImagesInYear: ScoutingAppRouteHandler<
  GetRobotImagesInYearRoute
> = async (c) => {
  const { teamNumber } = c.req.valid("param");
  const year = c.req.query("year") ?? new Date().getFullYear();

  const robotImages = await db.query.pitScoutImages.findMany({
    columns: {
      imageUrls: true,
    },
    where: eq(pitScoutImages.teamNumber, teamNumber),
    with: { season: true },
  });

  const filteredImages = robotImages.filter(image => image.season.year === Number(year));

  const imageUrls = filteredImages.flatMap(item => item.imageUrls ?? []);

  return c.json(imageUrls, HttpStatusCodes.OK);
};
