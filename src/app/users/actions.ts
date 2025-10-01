'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { userSchema } from '@/lib/schema';

const prisma = new PrismaClient();

export async function getUsers() {
  return prisma.user.findMany();
}

export async function upsertUser(user: unknown) {
  const result = userSchema.safeParse(user);

  if (!result.success) {
    return {
      success: false,
      error: result.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = result.data;

  await prisma.user.upsert({
    where: { id: id || '' },
    create: data,
    update: data,
  });

  revalidatePath('/users');

  return {
    success: true,
  };
}

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: { id },
  });

  revalidatePath('/users');
}
