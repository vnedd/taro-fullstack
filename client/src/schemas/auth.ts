import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const updateUserSchema = z.object({
  username: z.optional(
    z.string().min(3, "Username must be at least 3 characters")
  ),

  avatar_url: z.optional(z.string()),
  currentPassword: z.optional(z.string()),
  newPassword: z.optional(z.string()),
});

export type TUpdateUserSchema = z.infer<typeof updateUserSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TRegisterSchema = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema, updateUserSchema };
