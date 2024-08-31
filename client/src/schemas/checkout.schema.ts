import { z } from "zod";

const phoneValidation = new RegExp(/^\+?1?[2-9]\d{2}[2-9](?!11)\d{6}$/);

export const checkoutSchema = z.object({
  customer_name: z.string().min(2, {
    message: "Your name must be at least 2 characters.",
  }),
  phone: z
    .string()
    .min(1, { message: "Must have at least 1 character" })
    .regex(phoneValidation, { message: "invalid phone" }),
  line1: z.string().min(2, {
    message: "Address line 1 must be at least 2 characters.",
  }),
  line2: z.optional(z.string()),
  postalCode: z.string().min(4, {
    message: "PostalCode must be at least 4 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  region: z.string().min(2, {
    message: "Please select a region",
  }),
});

export type TCheckoutSchema = z.infer<typeof checkoutSchema>;
