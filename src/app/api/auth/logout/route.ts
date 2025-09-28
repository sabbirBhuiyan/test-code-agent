import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    const sessionToken = cookies().get('session')?.value;

    if (sessionToken) {
      await prisma.user.updateMany({
        where: { sessionToken },
        data: { sessionToken: null },
      });
    }

    cookies().delete('session');

    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
