import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const teamMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  imageUrl: z.string().url().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const teamMember = await prisma.teamMember.findUnique({
        where: { id },
      });

      if (!teamMember) {
        return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
      }

      return NextResponse.json({ teamMember });
    }

    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { role: 'asc' },
    });

    return NextResponse.json({ teamMembers });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch team members' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: 'Team member ID required' }, { status: 400 });
    }

    const validatedData = teamMemberSchema.parse(data);

    const teamMember = await prisma.teamMember.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ teamMember });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating team member:', error);
    return NextResponse.json(
      { error: 'Failed to update team member' },
      { status: 500 }
    );
  }
}
