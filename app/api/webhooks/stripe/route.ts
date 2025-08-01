import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../../lib/stripe';
import { prisma } from '../../../../lib/db';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { userId, deviceId, quantity, days, type } = session.metadata!;

  if (type === 'purchase') {
    // Create order
    const order = await prisma.order.create({
      data: {
        userId,
        status: 'CONFIRMED',
        totalAmount: session.amount_total! / 100,
        paymentId: session.payment_intent as string,
        orderItems: {
          create: {
            deviceId,
            quantity: parseInt(quantity),
            price: session.amount_total! / 100 / parseInt(quantity),
          },
        },
      },
    });

    // Update device stock
    await prisma.device.update({
      where: { id: deviceId },
      data: {
        stock: {
          decrement: parseInt(quantity),
        },
      },
    });

    // Update availability if stock is 0
    const device = await prisma.device.findUnique({
      where: { id: deviceId },
    });

    if (device && device.stock <= 0) {
      await prisma.device.update({
        where: { id: deviceId },
        data: { isAvailable: false },
      });
    }
  } else if (type === 'rental') {
    // Create rental
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + parseInt(days));

    await prisma.rental.create({
      data: {
        userId,
        status: 'ACTIVE',
        startDate,
        endDate,
        totalAmount: session.amount_total! / 100,
        paymentId: session.payment_intent as string,
        rentalItems: {
          create: {
            deviceId,
            quantity: parseInt(quantity),
            dailyRate: session.amount_total! / 100 / parseInt(quantity) / parseInt(days),
          },
        },
      },
    });

    // Update device stock for rental
    await prisma.device.update({
      where: { id: deviceId },
      data: {
        stock: {
          decrement: parseInt(quantity),
        },
      },
    });
  }
}