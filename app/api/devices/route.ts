import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { z } from 'zod';

const deviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  price: z.number().positive('Price must be positive'),
  rentPrice: z.number().positive('Rent price must be positive'),
  imageUrl: z.string().optional(),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
});

export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error('Error fetching devices:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = deviceSchema.parse(body);

    const device = await prisma.device.create({
      data: {
        ...validatedData,
        isAvailable: validatedData.stock > 0,
      },
    });

    return NextResponse.json(device, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating device:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}