import type { ScoutingAppRouteHandler } from "../../../lib/types.js";
import type { GetPitScoutingReportsForTeam } from "./pit-scouting.routes.js";
import { and, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import * as HttpStatusCodes from "stoker/http-status-codes";
import db from "../../../db/index.js";
import { events, pitScouting, seasons } from "../../../db/schema.js";

export const getPitScoutingReportsForTeam: ScoutingAppRouteHandler<
  GetPitScoutingReportsForTeam
> = async (c) => {
  const { teamNumber } = c.req.valid("param");
  const year = c.req.query("year");
  const eventKey = c.req.query("eventKey");

  const aliasedSeasons = alias(seasons, "season");
  const aliasedEvents = alias(events, "event");
  const aliasedPitScouting = alias(pitScouting, "pitScoutReport");

  const results = await db
    .select()
    .from(aliasedPitScouting)
    .leftJoin(aliasedEvents, eq(aliasedPitScouting.eventId, aliasedEvents.id))
    .leftJoin(aliasedSeasons, eq(aliasedEvents.seasonId, aliasedSeasons.id))
    .where(
      and(
        eq(aliasedPitScouting.teamNumber, teamNumber),
        year ? eq(aliasedSeasons.year, Number(year)) : undefined,
        eventKey ? eq(aliasedEvents.eventKey, eventKey) : undefined,
      ),
    );

  return c.json(results, HttpStatusCodes.OK);
};
