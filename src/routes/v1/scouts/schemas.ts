import z from "zod";
import { team } from "../../../db/schema.js";

export const ScoutSchema = z.object({
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

export const MatchCommentSchema = z.object({
  id: z.number(),
  eventId: z.number(),
  scoutId: z.number(),
  teamNumber: z.number(),
  matchNumber: z.string(),
  comment: z.string(),
  timestamp: z.string(),
});
