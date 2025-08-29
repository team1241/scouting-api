import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { notFoundSchema } from "../../../lib/constants.js";
import { SeasonSchema } from "./schemas.js";

const tags = ["Seasons"];

export const listSeasons = createRoute({
  path: "/seasons",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(SeasonSchema),
      "List of seasons",
    ),
  },
});

export type ListSeasonRoute = typeof listSeasons;

export const activeSeason = createRoute({
  path: "/seasons/active",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      SeasonSchema,
      "Current active season",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Active season not found",
    ),
  },
});

export type ActiveSeasonRoute = typeof activeSeason;
