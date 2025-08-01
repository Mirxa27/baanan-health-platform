import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';
import { z } from 'zod';

const updateAgentSchema = z.object({
  isActive: z.boolean(),
});

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ agentId: string }> }
) {
  const params = await context.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = updateAgentSchema.parse(body);

    const agent = await prisma.customerServiceAgent.update({
      where: { id: params.agentId },
      data: validatedData,
    });

    return NextResponse.json(agent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Error updating agent:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}