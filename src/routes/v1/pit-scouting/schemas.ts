import { createSelectSchema } from "drizzle-zod";
import z from "zod";
import { events, pitScouting, seasons } from "../../../db/schema.js";

const pitScoutSchema = createSelectSchema(pitScouting);
const seasonSchema = createSelectSchema(seasons);
const eventSchema = createSelectSchema(events);

export const GetPitScoutingReportsForTeamSchema = z.object({
  pitScoutReport: pitScoutSchema,
  event: eventSchema.nullable(),
  season: seasonSchema.nullable(),
});
