import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const jobOpeningSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  active: z.boolean(),
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
      const jobOpening = await prisma.jobOpening.findUnique({
        where: { id },
      });

      if (!jobOpening) {
        return NextResponse.json({ error: 'Job opening not found' }, { status: 404 });
      }

      return NextResponse.json({ jobOpening });
    }

    const jobOpenings = await prisma.jobOpening.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ jobOpenings });
  } catch (error) {
    console.error('Error fetching job openings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job openings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = jobOpeningSchema.parse(body);

    const jobOpening = await prisma.jobOpening.create({
      data: validatedData,
    });

    return NextResponse.json({ jobOpening }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error creating job opening:', error);
    return NextResponse.json(
      { error: 'Failed to create job opening' },
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
      return NextResponse.json({ error: 'Job opening ID required' }, { status: 400 });
    }

    const validatedData = jobOpeningSchema.parse(data);

    const jobOpening = await prisma.jobOpening.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json({ jobOpening });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Error updating job opening:', error);
    return NextResponse.json(
      { error: 'Failed to update job opening' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job opening ID required' }, { status: 400 });
    }

    await prisma.jobOpening.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job opening:', error);
    return NextResponse.json(
      { error: 'Failed to delete job opening' },
      { status: 500 }
    );
  }
}
