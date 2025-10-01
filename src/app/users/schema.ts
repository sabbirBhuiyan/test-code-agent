import { z } from "zod"

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(1, "Username is required").optional().or(z.literal('')), // Allow empty string for optional
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().or(z.literal('')), // Allow empty string for optional
  address: z.string().optional().or(z.literal('')), // Allow empty string for optional
})