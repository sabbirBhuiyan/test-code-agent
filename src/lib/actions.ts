
'use server';

import { User, userSchema, loginSchema, signupSchema } from './schemas';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid'; // Will need to add uuid package

// Mock UserRepository for demonstration purposes, simulating a persistent data layer
const userRepository = {
  _users: [] as User[], // Internal mock storage

  async find(): Promise<User[]> {
    console.log("Fetching all users from mock DB.");
    return this._users;
  },

  async findById(id: string): Promise<User | null> {
    console.log(`Fetching user with ID: ${id} from mock DB.`);
    return this._users.find(user => user.id === id) || null;
  },

  async findByEmail(email: string): Promise<User | null> {
    console.log(`Searching for user with email: ${email} in mock DB.`);
    return this._users.find(user => user.email === email) || null;
  },

  async findByUsername(username: string): Promise<User | null> {
    console.log(`Searching for user with username: ${username} in mock DB.`);
    return this._users.find(user => user.username === username) || null;
  },

  async update(userData: User): Promise<boolean> {
    console.log(`Updating user with ID: ${userData.id} in mock DB.`);
    const index = this._users.findIndex(user => user.id === userData.id);
    if (index !== -1) {
      this._users[index] = userData;
      return true;
    }
    return false;
  },

  async create(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = { ...userData, id: uuidv4() };
    console.log(`Creating new user in mock DB with ID: ${newUser.id}.`);
    this._users.push(newUser);
    return newUser;
  },
};

export async function getUsers(): Promise<User[]> {
  return userRepository.find();
}

export async function updateUser(userData: User): Promise<{ success: boolean; message?: string; errors?: Record<string, string> }> {
  try {
    if (!userData.id) {
      return { success: false, message: 'Missing user ID.' };
    }
    const validatedData = userSchema.parse(userData);
    const success = await userRepository.update(validatedData);
    if (success) {
      console.log('User updated:', validatedData.id);
      return { success: true };
    } else {
      return { success: false, message: 'User not found or update failed.' };
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach(issue => {
        if (issue.path[0]) errors[issue.path[0] as string] = issue.message;
      });
      return { success: false, message: 'Validation failed', errors };
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
    console.log('Attempting to log in with email:', email);
    // Mock authentication
    const user = await userRepository.findByEmail(email as string);
    if (user && password === 'password') { // Simplified mock password check
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

export async function signup(formData: FormData): Promise<{ success: boolean; message?: string }> {
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    signupSchema.parse({ username, email, password });

    // Check for duplicate username or email
    const existingUserByEmail = await userRepository.findByEmail(email as string);
    if (existingUserByEmail) {
      return { success: false, message: 'Email already registered.' };
    }
    const existingUserByUsername = await userRepository.findByUsername(username as string);
    if (existingUserByUsername) {
      return { success: false, message: 'Username already taken.' };
    }

    // In a real app, you would hash the password before storing it
    console.log('Attempting to sign up new user with email:', email);

    await userRepository.create({
      username: username as string,
      email: email as string,
      phone: '',
      address: '',
      // In a real app, the password would be hashed and stored, not plaintext
      // For this mock, we're not storing passwords directly in the mock repo
    });

    return { success: true, message: 'Signup successful' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0].message };
    }
    return { success: false, message: 'An unexpected error occurred' };
  }
}
