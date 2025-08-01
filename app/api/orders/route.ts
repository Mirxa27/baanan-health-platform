import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { stripe } from '../../../lib/stripe';
import { z } from 'zod';

const orderSchema = z.object({
  deviceId: z.string(),
  quantity: z.number().int().positive(),
  type: z.enum(['purchase']),
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

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      include: {
        orderItems: {
          include: {
            device: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
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
    const validatedData = orderSchema.parse(body);

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

    const totalAmount = Number(device.price) * validatedData.quantity;

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: device.name,
              description: `${device.brand} - ${device.model}`,
            },
            unit_amount: Math.round(device.price * 100),
          },
          quantity: validatedData.quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/halol/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/halol/dashboard?canceled=true`,
      metadata: {
        userId: session.user.id,
        deviceId: validatedData.deviceId,
        quantity: validatedData.quantity.toString(),
        type: 'purchase',
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

    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
