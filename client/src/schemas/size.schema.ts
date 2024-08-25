import { z } from "zod";

export const sizeschema = z.object({
  name: z.string().min(1, {
    message: "Size must be at least 1 characters.",
  }),
  value: z.string().min(1, {
    message: "Value must be at least 1 characters.",
  }),
});

export type TSizeSchema = z.infer<typeof sizeschema>;
