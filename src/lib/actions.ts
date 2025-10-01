
'use server';

import { User, userSchema, loginSchema, signupSchema } from './schemas';
import { z } from 'zod';

// Mock database for demonstration purposes
let users: User[] = [
  {
    id: '1',
    username: 'john.doe',
    phone: '123-456-7890',
    email: 'john.doe@example.com',
    address: '123 Main St',
  },
  {
    id: '2',
    username: 'jane.smith',
    phone: '098-765-4321',
    email: 'jane.smith@example.com',
    address: '456 Oak Ave',
  },
];

export async function getUsers(): Promise<User[]> {
  // In a real application, you would fetch users from a database
  return users;
}

export async function updateUser(userData: User): Promise<{ success: boolean; message?: string }> {
  try {
    const validatedData = userSchema.parse(userData);
    const index = users.findIndex((user) => user.id === validatedData.id);
    if (index !== -1) {
      users[index] = validatedData;
      console.log('User updated:', validatedData);
      return { success: true };
    } else {
      return { success: false, message: 'User not found' };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    loginSchema.parse({ email, password });
    // In a real app, you would verify credentials against a database
    console.log('Attempting to log in with:', { email, password });
    if (email === 'test@example.com' && password === 'password') {
      return { success: true, message: 'Login successful' };
    } else {
      return { success: false, message: 'Invalid credentials' };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}

export async function signup(formData: FormData) {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    signupSchema.parse({ username, email, password });
    // In a real app, you would create a new user in your database
    console.log('Attempting to sign up with:', { username, email, password });
    // For demonstration, let's just add a new user to our mock array
    const newUser: User = {
      id: String(users.length + 1),
      username: username as string,
      email: email as string,
      phone: '',
      address: '',
    };
    users.push(newUser);
    return { success: true, message: 'Signup successful' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}
