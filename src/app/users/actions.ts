import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: 'Failed to fetch users.' };
  }
}

export async function updateUser(id: string, formData: FormData) {
  try {
    const parsedData = userSchema.omit({ id: true }).safeParse(Object.fromEntries(formData.entries()));

    if (!parsedData.success) {
      return { success: false, errors: parsedData.error.flatten().fieldErrors };
    }

    const { username, email, phone, address } = parsedData.data;

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username: username || null,
        email,
        phone: phone || null,
        address: address || null,
      },
    });
    return { success: true, data: updatedUser };
  } catch (error) {
    console.error('Error updating user:', error);
    return { success: false, error: 'Failed to update user.' };
  }
}