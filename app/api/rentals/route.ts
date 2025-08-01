import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { stripe } from '../../../lib/stripe';
import { z } from 'zod';

const rentalSchema = z.object({
  deviceId: z.string(),
  quantity: z.number().int().positive(),
  days: z.number().int().positive(),
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

    const rentals = await prisma.rental.findMany({
      where: { userId: session.user.id },
      include: {
        rentalItems: {
          include: {
            device: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(rentals);
  } catch (error) {
    console.error('Error fetching rentals:', error);
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
    const validatedData = rentalSchema.parse(body);

    // Get device details
    const device = await prisma.device.findUnique({
      where: { id: validatedData.deviceId },
    });

    if (!device) {
      return NextResponse.json(
        { error: 'Device not found' },
        { status: 404 }
      );
    }

    if (!device.isAvailable || device.stock < validatedData.quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    const totalAmount = device.rentPrice * validatedData.quantity * validatedData.days;

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${device.name} (Rental)`,
              description: `${device.brand} - ${device.model} for ${validatedData.days} days`,
            },
            unit_amount: Math.round(totalAmount * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/halol/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/halol/dashboard?canceled=true`,
      metadata: {
        userId: session.user.id,
        deviceId: validatedData.deviceId,
        quantity: validatedData.quantity.toString(),
        days: validatedData.days.toString(),
        type: 'rental',
      },
    });

    return NextResponse.json({ sessionUrl: stripeSession.url });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating rental:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}