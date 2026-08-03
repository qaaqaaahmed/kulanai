import z from "zod";

export const AgentsInsertSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  instructions: z.string().min(1, { error: "instructions are required" }),
});

export const AgentsUpdateSchema = AgentsInsertSchema.extend({
  id: z.string().min(1, { error: "ID is required" }),
});
