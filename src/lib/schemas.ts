import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(3, { message: 'Username must be at least 3 characters.' }).optional().or(z.literal('')), 
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().optional().or(z.literal('')), 
  address: z.string().optional().or(z.literal('')), 
});

export type UserSchema = z.infer<typeof userSchema>;