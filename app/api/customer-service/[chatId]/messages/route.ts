import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';
import { z } from 'zod';

const messageSchema = z.object({
  content: z.string().min(1, 'Content is required'),
  isFromUser: z.boolean().optional().default(true),
});

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ chatId: string }> }
) {
  const params = await context.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = messageSchema.parse(body);

    // Verify chat belongs to user
    const chat = await prisma.customerServiceChat.findFirst({
      where: {
        id: params.chatId,
        userId: session.user.id,
      },
    });

    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    const message = await prisma.customerServiceMessage.create({
      data: {
        chatId: params.chatId,
        content: validatedData.content,
        isFromUser: validatedData.isFromUser,
      },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}