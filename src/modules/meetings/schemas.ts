import z from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  agentId: z.string().min(1, { error: "Agent is required" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { error: "Meeting Id is required" }),
});
