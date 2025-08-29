import z from "zod";
import { fieldImageType } from "../../../db/schema.js";

export const FieldImageSchema = z.object({
  id: z.number(),
  seasonId: z.number(),
  type: z.enum(fieldImageType.enumValues),
  imageUrl: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
