import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { z } from 'zod';

const maintenanceSchema = z.object({
  deviceId: z.string(),
  description: z.string().min(1, 'Description is required'),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const requests = await prisma.maintenanceRequest.findMany({
      where: { userId: session.user.id },
      include: {
        device: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = maintenanceSchema.parse(body);

    // Verify device exists
    const device = await prisma.device.findUnique({
      where: { id: validatedData.deviceId },
    });

    if (!device) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    const maintenanceRequest = await prisma.maintenanceRequest.create({
      data: {
        userId: session.user.id,
        deviceId: validatedData.deviceId,
        description: validatedData.description,
      },
      include: {
        device: true,
      },
    });

    return NextResponse.json(maintenanceRequest, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating maintenance request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}