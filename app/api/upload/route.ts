import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/\s/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    const filename = `${timestamp}-${sanitizedName}`;
    
    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    // Save original
    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // Generate optimized version
    const optimizedFilename = `${timestamp}-optimized-${sanitizedName.replace(/\.[^.]+$/, '.webp')}`;
    const optimizedPath = join(uploadDir, optimizedFilename);
    
    await sharp(buffer)
      .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(optimizedPath);

    // Generate thumbnail
    const thumbnailFilename = `${timestamp}-thumb-${sanitizedName.replace(/\.[^.]+$/, '.webp')}`;
    const thumbnailPath = join(uploadDir, thumbnailFilename);
    
    await sharp(buffer)
      .resize(400, 400, { fit: 'cover' })
      .webp({ quality: 80 })
      .toFile(thumbnailPath);

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      optimizedUrl: `/uploads/${optimizedFilename}`,
      thumbnailUrl: `/uploads/${thumbnailFilename}`,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
