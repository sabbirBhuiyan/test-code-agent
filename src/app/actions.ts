import { prisma } from '@/lib/prisma';
import { userSchema } from '@/lib/schemas';
import { z } from 'zod';

export async function getUsers() {
  try {
    const users = await prisma.user.findMany();
    return { users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Failed to fetch users." };
  }
}

export async function updateUser(values: z.infer<typeof userSchema>) {
  try {
    const validatedFields = userSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    const { id, username, email, phone, address } = validatedFields.data;

    if (!id) {
      return { error: "User ID is required for update." };
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email, phone, address },
    });

    return { user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Failed to update user." };
  }
}
