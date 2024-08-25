import { z } from "zod";

export const styleschema = z.object({
  name: z.string().min(2, {
    message: "Style must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export type TStyleSchema = z.infer<typeof styleschema>;
