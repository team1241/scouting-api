import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { z } from "zod";
import { notFoundSchema } from "../../../lib/constants.js";
import { MatchCommentSchema, ScoutSchema } from "./schemas.js";

const tags = ["Scouts"];

export const listScouts = createRoute({
  path: "/scouts",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(ScoutSchema), "List of scouts"),
  },
});

export const listCommentsForScout = createRoute({
  path: "/scouts/{id}/comments",
  method: "get",
  tags,
  request: { params: IdParamsSchema },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(MatchCommentSchema), "Match comments for scout"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(notFoundSchema, "Scout not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export type ListScoutsRoute = typeof listScouts;
export type ListCommentsForScoutRoute = typeof listCommentsForScout;
