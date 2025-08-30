import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { z } from "zod";
import { GetPitScoutingReportsForTeamSchema } from "./schemas.js";

const tags = ["Pit Scouting"];

export const getPitScoutingReportsForTeam = createRoute({
  path: "/pit-scouting/{teamNumber}",
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
      eventKey: z.string().optional().openapi({
        param: {
          name: "eventKey",
          in: "query",
        },
        example: "onosh",
      }),
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
    [HttpStatusCodes.OK]: jsonContent(z.array(GetPitScoutingReportsForTeamSchema), "List of pit scout reports for a team in the specified year"),
  },
});

export type GetPitScoutingReportsForTeam = typeof getPitScoutingReportsForTeam;
