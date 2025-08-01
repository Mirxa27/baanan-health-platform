import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { prisma } from '../../../lib/db';
import { z } from 'zod';

const chatSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
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

    const chats = await prisma.customerServiceChat.findMany({
      where: { userId: session.user.id },
      include: {
        agent: true,
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
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
    const validatedData = chatSchema.parse(body);

    // Find an available AI agent
    const aiAgent = await prisma.customerServiceAgent.findFirst({
      where: {
        type: 'AI',
        isActive: true,
      },
    });

    const chat = await prisma.customerServiceChat.create({
      data: {
        userId: session.user.id,
        subject: validatedData.subject,
        agentId: aiAgent?.id,
      },
      include: {
        agent: true,
        messages: true,
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}