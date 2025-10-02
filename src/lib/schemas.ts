
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid().optional(),
  username: z.string().min(3, 'Username is required and must be at least 3 characters'),
  phone: z.string().min(10, 'Phone number is required and must be at least 10 digits').optional().or(z.literal('')),
  email: z.string().email('Invalid email address'),
  address: z.string().min(5, 'Address is required and must be at least 5 characters').optional().or(z.literal('')),
  passwordHash: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = z.object({
  username: z.string().min(3, 'Username is required and must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
