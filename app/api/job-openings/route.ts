import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const jobOpenings = await prisma.jobOpening.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        requirements: true,
        active: true,
      },
    });

    return NextResponse.json(jobOpenings);
  } catch (error) {
    console.error('Error fetching job openings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job openings' },
      { status: 500 }
    );
  }
}
