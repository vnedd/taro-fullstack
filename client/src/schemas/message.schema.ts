import { z } from "zod";

export const messageSchema = z.object({
  body: z.optional(z.string()),
  image: z.optional(z.string()),
});

export type TMessageSchema = z.infer<typeof messageSchema>;
