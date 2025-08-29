import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { notFoundSchema } from "../../../lib/constants.js";
import { FieldImageSchema } from "./schemas.js";

const tags = ["Images"];

export const listFieldImagesForActiveSeason = createRoute({
  path: "/field-images/active",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(FieldImageSchema), "List of field images for the active season"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "No active season found"),
  },
});

export const getRobotImagesInYear = createRoute({
  path: "/robot-images/{teamNumber}",
  method: "get",
  tags,
  request: {
    params: z.object({
      teamNumber: z.coerce.number().openapi({
        param: {
          name: "teamNumber",
          in: "path",
        },
        example: 1241,
      }),
    }),
    query: z.object({
      year: z.coerce.number().optional().openapi({
        param: {
          name: "year",
          in: "query",
        },
        example: 2025,
        default: new Date().getFullYear(),
      }),
    }),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(z.string()), "List of robot image URLs for the specified year"),
  },
});

export type ListFieldImagesForActiveSeasonRoute = typeof listFieldImagesForActiveSeason;
export type GetRobotImagesInYearRoute = typeof getRobotImagesInYear;
