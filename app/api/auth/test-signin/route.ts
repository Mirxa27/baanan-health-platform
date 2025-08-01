import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Test database connection
    const userCount = await prisma.user.count();
    console.log(`Total users in database: ${userCount}`);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found', users_in_db: userCount },
        { status: 404 }
      );
    }

    // Test password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      password_valid: isPasswordValid,
      users_in_db: userCount
    });

  } catch (error) {
    console.error('Test signin error:', error);
    return NextResponse.json(
      { error: 'Database connection failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
