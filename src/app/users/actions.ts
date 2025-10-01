"use server"

import { prisma } from "@/lib/prisma"
import { userSchema } from "./schema"
import { z } from "zod"

// Initialize Prisma Client (if not already done globally)
// This is a common pattern to avoid multiple Prisma Client instances in Next.js server actions
declare global {
  var prisma: PrismaClient | undefined
}

import { PrismaClient } from "@prisma/client"

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db

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

export async function updateUser(values: z.infer<typeof userSchema>) {
  try {
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
  } catch (error) {
    console.error("Error updating user:", error)
    return { error: "Failed to update user" }
  }
}
