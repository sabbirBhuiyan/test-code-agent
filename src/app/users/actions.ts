"use server"

import { userSchema } from "./schema"
import { z } from "zod"
import { PrismaClientKnownRequestError } from "@prisma/client"
import { prisma as db } from "@/lib/prisma"

export async function getUsers() {
  try {
    const users = await db.user.findMany({
      select: { id: true, username: true, email: true, phone: true, address: true },
    })
    return { users }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { error: "Failed to fetch users" }
  }
}

export async function updateUser(values: z.infer<typeof userSchema> & { id: string }) {
  try {
    // Placeholder for session/authorization. In a real app, this would come from your auth system.
    const session = { userId: "some_current_user_id", isAdmin: true }; // Example session

    const validatedFields = userSchema.safeParse(values)

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { id, username, email, phone, address } = validatedFields.data

    if (!id) {
      return { error: "User ID is required for update" }
    }

    // Authorization check
    // For demonstration, assuming the user can only update their own profile or an admin can update any.
    // You would replace 'session.userId' with the actual authenticated user's ID.
    if (!session.isAdmin && session.userId !== id) {
      return { error: "Unauthorized to update this user." };
    }

    // Existence check
    const existingUser = await db.user.findUnique({ where: { id } });
    if (!existingUser) {
      return { error: "User not found." };
    }

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        username: username || null, // Store empty string as null in DB
        email,
        phone: phone || null, // Store empty string as null in DB
        address: address || null, // Store empty string as null in DB
      },
      select: { id: true, username: true, email: true, phone: true, address: true },
    })
    return { user: updatedUser }
  } catch (error: any) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return { error: "Email already in use." };
    }
    console.error("Error updating user:", error)
    return { error: "Failed to update user." }
  }
}
