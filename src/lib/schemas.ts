
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
