import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string().min(3, 'Username must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
});
