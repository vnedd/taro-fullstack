import { z } from "zod";

const variantSchema = z.object({
  id: z.string().optional(),
  style: z.string().min(1, "Style is required"),
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  styleName: z.string().min(1, "Style is required"),
  sizeName: z.string().min(1, "Size is required"),
  colorName: z.string().min(1, "Color is required"),
  price: z.number().min(0, "Price must be at least 0"),
  stock: z.number().min(0, "Stock must be at least 0"),
});

export const productschema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(2, { message: "Please select a category" }),
  images: z
    .array(z.string())
    .min(1, {
      message: "Please upload a least one image",
    })
    .max(5),
  product_sizes: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one size.",
    }),
  product_colors: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one color.",
    }),
  product_styles: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one products style.",
    }),
  isFeatured: z.boolean().default(true).optional(),
  discount: z.optional(z.coerce.number().min(0).max(100)).default(0),
  variants: z.array(variantSchema),
});

export type TProductSchema = z.infer<typeof productschema>;
