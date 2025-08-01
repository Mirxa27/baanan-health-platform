import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Test basic query
    const userCount = await prisma.user.count();
    const deviceCount = await prisma.device.count();
    
    // Test more complex query
    const recentUsers = await prisma.user.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      }
    });

    return NextResponse.json({
      status: 'healthy',
      database: 'postgresql',
      connection: 'success',
      statistics: {
        totalUsers: userCount,
        totalDevices: deviceCount,
      },
      recentUsers,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Database health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        database: 'postgresql',
        connection: 'failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
