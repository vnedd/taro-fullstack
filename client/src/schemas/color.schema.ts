import { z } from "zod";

export const colorschema = z.object({
  name: z.string().min(1, {
    message: "Color must be at least 1 characters.",
  }),
  value: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: "Color must be a valid hex code",
  }),
});

export type TColorSchema = z.infer<typeof colorschema>;
