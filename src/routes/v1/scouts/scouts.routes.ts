import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";
import { team } from "../../../db/schema.js";
import { notFoundSchema } from "../../../lib/constants.js";

const tags = ["Scouts"];

const ScoutSchema = z.object({
  id: z.number(),
  grade: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isAdmin: z.boolean(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  team: z.enum(team.enumValues).nullable(),
  isSignupComplete: z.boolean(),
  clerkId: z.string(),
});

const MatchCommentSchema = z.object({
  id: z.number(),
  eventId: z.number(),
  scoutId: z.number(),
  teamNumber: z.number(),
  matchNumber: z.string(),
  comment: z.string(),
  timestamp: z.string(),
});

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
