import z from "zod";

export const SeasonSchema = z.object({
  id: z.number(),
  year: z.number(),
  gameName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean(),
});
