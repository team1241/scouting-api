import type { ScoutingAppRouteHandler } from "../../../lib/types.js";
import type { ListCommentsForScoutRoute, ListScoutsRoute } from "./scouts.routes.js";

import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "../../../db/index.js";
import { matchComments, users } from "../../../db/schema.js";

async function getScoutById(scoutId: number) {
  const scout = await db.query.users.findFirst({ where: eq(users.id, scoutId) });
  return scout;
}

export const listScouts: ScoutingAppRouteHandler<ListScoutsRoute> = async (c) => {
  const scouts = await db.query.users.findMany();

  return c.json(scouts, HttpStatusCodes.OK);
};

export const listCommentsForScout: ScoutingAppRouteHandler<ListCommentsForScoutRoute> = async (c) => {
  const { id: scoutId } = c.req.valid("param");
  const findScoutResponse = await getScoutById(scoutId);

  if (!findScoutResponse) {
    return c.json({
      message: "Scout not found",
    }, HttpStatusCodes.NOT_FOUND);
  }

  const comments = await db.query.matchComments.findMany({ where: eq(matchComments.scoutId, scoutId) });

  return c.json(comments, HttpStatusCodes.OK);
};
