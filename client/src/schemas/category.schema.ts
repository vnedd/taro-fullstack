import { z } from "zod";

export const categorychema = z.object({
  name: z.string().min(2, {
    message: "Category must be at least 2 characters.",
  }),
  image_url: z.string().min(2, {
    message: "Image is required",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

export type TCategorySchema = z.infer<typeof categorychema>;
