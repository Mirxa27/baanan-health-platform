import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      total_users: users.length,
      users: users
    });

  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
