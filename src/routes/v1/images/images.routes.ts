import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { fieldImageType } from "../../../db/schema.js";
import { notFoundSchema } from "../../../lib/constants.js";

const tags = ["Images"];

const ImageSchema = z.object({
  id: z.number(),
  seasonId: z.number(),
  type: z.enum(fieldImageType.enumValues),
  imageUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const listFieldImagesForActiveSeason = createRoute({
  path: "/field-images/active",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(ImageSchema), "List of field images for the active season"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "No active season found"),
  },
});

export type ListFieldImagesForActiveSeasonRoute = typeof listFieldImagesForActiveSeason;
