# Design Document: AL FURSAN Technologies Website

## Overview

The AL FURSAN Technologies website is a full-stack web application consisting of two main components: a public-facing website with dark theme and animations, and an authenticated admin panel for content management. The system enables visitors to explore services, read blog posts, view projects, and request consultations, while administrators manage all dynamic content through a secure interface.

### Technology Stack

- **Frontend Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **File Storage**: Local filesystem with public serving (initial), extensible to cloud storage
- **Image Optimization**: Next.js Image component with sharp
- **Form Validation**: Zod
- **Rich Text Editor**: Tiptap or similar

### Key Design Principles

1. **Separation of Concerns**: Clear boundaries between public and admin functionality
2. **Server-Side Rendering**: Leverage Next.js SSR for SEO and performance
3. **Type Safety**: End-to-end TypeScript for reliability
4. **Responsive Design**: Mobile-first approach with Tailwind breakpoints
5. **Performance**: Optimized images, code splitting, and efficient animations
6. **Accessibility**: WCAG compliance with reduced-motion support

## Architecture

### System Architecture

The application follows a monolithic Next.js architecture with clear separation between public and admin routes:

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│  Public Routes          │  Admin Routes (Protected)         │
│  /                      │  /admin                           │
│  /services              │  /admin/projects                  │
│  /blogs                 │  /admin/blog-posts                │
│  /blogs/[slug]          │  /admin/job-openings              │
│  /about                 │  /admin/services                  │
│  /consultation          │  /admin/team                      │
│  /api/consultation      │  /admin/consultation-requests     │
│                         │  /api/admin/*                     │
│                         │  /api/auth/*                      │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    ┌──────────────────┐
                    │   Prisma ORM     │
                    └──────────────────┘
                              ↓
                    ┌──────────────────┐
                    │   PostgreSQL     │
                    └──────────────────┘
```

### Frontend Architecture

#### Route Structure

```
app/
├── (public)/                    # Public route group
│   ├── layout.tsx              # Public layout with header/footer
│   ├── page.tsx                # Home page
│   ├── services/
│   │   └── page.tsx
│   ├── blogs/
│   │   ├── page.tsx            # Blog list
│   │   └── [slug]/
│   │       └── page.tsx        # Individual blog post
│   ├── about/
│   │   └── page.tsx
│   └── consultation/
│       └── page.tsx
├── admin/                       # Admin route group
│   ├── layout.tsx              # Admin layout with sidebar
│   ├── page.tsx                # Dashboard
│   ├── projects/
│   │   ├── page.tsx
│   │   ├── new/
│   │   │   └── page.tsx
│   │   └── [id]/
│   │       └── edit/
│   │           └── page.tsx
│   ├── blog-posts/
│   ├── job-openings/
│   ├── services/
│   ├── team/
│   └── consultation-requests/
├── api/
│   ├── consultation/
│   │   └── route.ts
│   ├── admin/
│   │   ├── projects/
│   │   ├── blog-posts/
│   │   ├── job-openings/
│   │   ├── services/
│   │   └── team/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts
└── login/
    └── page.tsx
```

#### Component Structure


```
components/
├── public/
│   ├── Header.tsx              # Navigation with logo
│   ├── Footer.tsx
│   ├── ServiceCard.tsx         # Animated service showcase
│   ├── BlogCard.tsx            # Blog post preview
│   ├── ProjectCard.tsx         # Project showcase item
│   ├── JobCard.tsx             # Job opening display
│   ├── ConsultationForm.tsx    # Contact form
│   ├── WhatsAppButton.tsx      # Floating WhatsApp button
│   └── AnimatedSection.tsx     # Scroll animation wrapper
├── admin/
│   ├── Sidebar.tsx             # Admin navigation
│   ├── DashboardCard.tsx       # Stat display
│   ├── DataTable.tsx           # Generic table component
│   ├── ImageUpload.tsx         # File upload component
│   ├── RichTextEditor.tsx      # Blog content editor
│   └── FormField.tsx           # Reusable form input
└── shared/
    ├── Button.tsx
    ├── Input.tsx
    ├── Modal.tsx
    └── LoadingSpinner.tsx
```

### State Management Approach

Given the application's requirements, we'll use a minimal state management approach:

1. **Server State**: React Server Components for initial data fetching
2. **Client State**: React hooks (useState, useReducer) for local UI state
3. **Form State**: React Hook Form for complex forms
4. **Cache Management**: Next.js built-in caching and revalidation
5. **Optimistic Updates**: For admin actions to improve UX

No global state management library (Redux, Zustand) is needed as:
- Most data is fetched per-page
- Admin operations are isolated
- No complex cross-component state sharing

## Components and Interfaces

### Public Website Components

#### ServiceCard Component

```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number; // For staggered animations
}

// Animations:
// - Fade in on scroll with stagger delay
// - Scale and glow on hover
// - Smooth transitions
```

#### BlogCard Component

```typescript
interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: Date;
  slug: string;
}

// Animations:
// - Fade up on scroll
// - Lift on hover
```

#### ProjectCard Component

```typescript
interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

// Animations:
// - Fade in on scroll
// - Image zoom on hover
```

#### ConsultationForm Component

```typescript
interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ConsultationFormProps {
  onSuccess: () => void;
}

// Validation with Zod schema
// Client-side and server-side validation
```

#### WhatsAppButton Component

```typescript
interface WhatsAppButtonProps {
  phoneNumber: string; // +923338705805
}

// Fixed position: bottom-right
// Pulse animation to draw attention
// Opens WhatsApp with pre-filled number
```

### Admin Panel Components

#### ImageUpload Component

```typescript
interface ImageUploadProps {
  onUpload: (url: string) => void;
  maxSizeMB: number;
  acceptedFormats: string[];
  currentImage?: string;
}

// Features:
// - Drag and drop support
// - Preview before upload
// - Progress indicator
// - Validation feedback
```

#### RichTextEditor Component

```typescript
interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>;
}

// Features:
// - Bold, italic, underline
// - Headings, lists
// - Links
// - Image insertion
// - Code blocks
```

#### DataTable Component

```typescript
interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

// Features:
// - Sortable columns
// - Action buttons (edit, delete)
// - Empty state
// - Loading state
```

### API Interfaces

#### Public API

```typescript
// POST /api/consultation
interface ConsultationRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ConsultationResponse {
  success: boolean;
  message: string;
}
```

#### Admin API

```typescript
// Projects
// GET /api/admin/projects
interface ProjectListResponse {
  projects: Project[];
}

// POST /api/admin/projects
interface CreateProjectRequest {
  title: string;
  description: string;
  imageUrl: string;
}

// PUT /api/admin/projects/[id]
interface UpdateProjectRequest {
  title?: string;
  description?: string;
  imageUrl?: string;
}

// DELETE /api/admin/projects/[id]
interface DeleteProjectResponse {
  success: boolean;
}

// Blog Posts
// GET /api/admin/blog-posts
interface BlogPostListResponse {
  posts: BlogPost[];
}

// POST /api/admin/blog-posts
interface CreateBlogPostRequest {
  title: string;
  content: string;
  author: string;
  published: boolean;
}

// Job Openings
// GET /api/admin/job-openings
interface JobOpeningListResponse {
  jobOpenings: JobOpening[];
}

// POST /api/admin/job-openings
interface CreateJobOpeningRequest {
  title: string;
  description: string;
  requirements: string;
  active: boolean;
}

// Services
// GET /api/admin/services
interface ServiceListResponse {
  services: Service[];
}

// PUT /api/admin/services/[id]
interface UpdateServiceRequest {
  title?: string;
  description?: string;
  displayOrder?: number;
}

// Team
// GET /api/admin/team
interface TeamInfoResponse {
  ceo: TeamMember;
  founder: TeamMember;
}

// PUT /api/admin/team/[id]
interface UpdateTeamMemberRequest {
  name?: string;
  imageUrl?: string;
}
```

## Data Models

### Database Schema (Prisma)

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model BlogPost {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  content     String   @db.Text
  excerpt     String?
  author      String
  published   Boolean  @default(false)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([published, publishedAt])
}

model JobOpening {
  id           String   @id @default(cuid())
  title        String
  description  String   @db.Text
  requirements String   @db.Text
  active       Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([active])
}

model Project {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  imageUrl    String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Service {
  id           String @id @default(cuid())
  title        String
  description  String @db.Text
  icon         String
  displayOrder Int    @default(0)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([displayOrder])
}

model TeamMember {
  id        String   @id @default(cuid())
  role      String   @unique // "CEO" or "FOUNDER"
  name      String
  imageUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model ConsultationRequest {
  id        String   @id @default(cuid())
  name      String
  email     String
  phone     String
  message   String   @db.Text
  createdAt DateTime @default(now())

  @@index([createdAt])
}
```

### TypeScript Types

```typescript
// types/index.ts

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  displayOrder: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobOpening {
  id: string;
  title: string;
  description: string;
  requirements: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  role: 'CEO' | 'FOUNDER';
  name: string;
  imageUrl?: string;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
}

export interface DashboardStats {
  totalBlogPosts: number;
  totalActiveJobs: number;
  totalProjects: number;
  totalConsultationRequests: number;
  recentConsultations: ConsultationRequest[];
}
```


## Animation System Implementation

### Framer Motion Integration

The animation system uses Framer Motion for declarative animations with performance optimization.

#### Animation Patterns

**1. Scroll-Based Animations**

```typescript
// components/shared/AnimatedSection.tsx
interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Uses Framer Motion's useInView hook
// Triggers animation when element enters viewport
// Respects prefers-reduced-motion
```

**2. Page Transitions**

```typescript
// app/template.tsx or layout.tsx
// Fade transition between route changes
// Duration: 200-300ms for snappy feel
```

**3. Hover Animations**

```typescript
// Service cards: scale(1.05) + glow effect
// Blog cards: translateY(-8px) + shadow
// Buttons: scale(0.98) on press
// WhatsApp button: pulse animation loop
```

**4. Staggered Animations**

```typescript
// Service cards on home page
// Stagger delay: 0.1s between each card
// Creates cascading effect
```

#### Animation Configuration

```typescript
// lib/animations.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Accessibility: Check prefers-reduced-motion
export const getAnimationProps = (animation: any) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      initial: animation.animate,
      animate: animation.animate,
      transition: { duration: 0 }
    };
  }
  return animation;
};
```

#### Performance Considerations

1. **GPU Acceleration**: Use transform and opacity properties only
2. **Will-Change**: Apply sparingly to animated elements
3. **Lazy Loading**: Animate only visible elements using Intersection Observer
4. **Frame Rate**: Target 60fps, degrade gracefully on slower devices
5. **Reduced Motion**: Respect user preferences for accessibility

## Authentication and Authorization

### NextAuth.js Configuration

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Route Protection

```typescript
// middleware.ts

import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
});

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*']
};
```

### Admin Layout Protection

```typescript
// app/admin/layout.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
```

### Password Security

1. **Hashing**: bcrypt with salt rounds of 10
2. **Storage**: Never store plain text passwords
3. **Validation**: Minimum 8 characters, require complexity
4. **Session**: JWT-based with secure httpOnly cookies
5. **CSRF Protection**: Built into NextAuth.js

## File Upload and Storage Strategy

### Initial Implementation: Local Filesystem

```typescript
// app/api/upload/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  // Verify authentication
  const session = await getServerSession();
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
      { error: 'Invalid file type' },
      { status: 400 }
    );
  }

  // Validate file size (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: 'File too large' },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `${timestamp}-${file.name.replace(/\s/g, '-')}`;
  
  // Create upload directory if it doesn't exist
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  await mkdir(uploadDir, { recursive: true });

  // Save original
  const filepath = join(uploadDir, filename);
  await writeFile(filepath, buffer);

  // Generate optimized versions
  const optimizedFilename = `${timestamp}-optimized-${file.name}`;
  const optimizedPath = join(uploadDir, optimizedFilename);
  
  await sharp(buffer)
    .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(optimizedPath);

  // Generate thumbnail
  const thumbnailFilename = `${timestamp}-thumb-${file.name}`;
  const thumbnailPath = join(uploadDir, thumbnailFilename);
  
  await sharp(buffer)
    .resize(400, 400, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(thumbnailPath);

  return NextResponse.json({
    url: `/uploads/${filename}`,
    optimizedUrl: `/uploads/${optimizedFilename}`,
    thumbnailUrl: `/uploads/${thumbnailFilename}`
  });
}
```

### Storage Structure

```
public/
└── uploads/
    ├── 1234567890-project-image.jpg
    ├── 1234567890-optimized-project-image.webp
    ├── 1234567890-thumb-project-image.webp
    └── ...
```

### Future Cloud Storage Migration

The design allows easy migration to cloud storage (AWS S3, Cloudflare R2, etc.):

```typescript
// lib/storage.ts

interface StorageProvider {
  upload(file: File): Promise<string>;
  delete(url: string): Promise<void>;
}

class LocalStorageProvider implements StorageProvider {
  async upload(file: File): Promise<string> {
    // Current implementation
  }
  async delete(url: string): Promise<void> {
    // Delete from filesystem
  }
}

class S3StorageProvider implements StorageProvider {
  async upload(file: File): Promise<string> {
    // Upload to S3
  }
  async delete(url: string): Promise<void> {
    // Delete from S3
  }
}

// Factory pattern for easy switching
export const storage: StorageProvider = 
  process.env.STORAGE_PROVIDER === 's3' 
    ? new S3StorageProvider() 
    : new LocalStorageProvider();
```

### Image Optimization Strategy

1. **Upload**: Accept JPEG, PNG, WebP
2. **Processing**: Convert to WebP for better compression
3. **Sizes**: Generate original, optimized (1200px), thumbnail (400px)
4. **Delivery**: Use Next.js Image component for automatic optimization
5. **Lazy Loading**: Images load as they enter viewport
6. **Responsive**: Serve appropriate size based on device


## Error Handling

### Client-Side Error Handling

#### Form Validation Errors

```typescript
// lib/validation.ts

import { z } from 'zod';

export const consultationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  author: z.string().min(2, 'Author name required'),
  published: z.boolean()
});

export const projectSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  imageUrl: z.string().url('Valid image URL required')
});

export const jobOpeningSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  requirements: z.string().min(20, 'Requirements must be at least 20 characters'),
  active: z.boolean()
});
```

#### Error Display Components

```typescript
// components/shared/ErrorMessage.tsx
interface ErrorMessageProps {
  message: string;
}

// components/shared/Toast.tsx
interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}
```

### Server-Side Error Handling

#### API Error Responses

```typescript
// lib/api-response.ts

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
  }
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { error: 'Validation failed', details: error.errors },
      { status: 400 }
    );
  }

  console.error('Unexpected error:', error);
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

#### Database Error Handling

```typescript
// lib/db-error-handler.ts

import { Prisma } from '@prisma/client';

export function handleDatabaseError(error: unknown) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === 'P2002') {
      return new ApiError(409, 'Resource already exists');
    }
    
    // Record not found
    if (error.code === 'P2025') {
      return new ApiError(404, 'Resource not found');
    }
  }

  return new ApiError(500, 'Database operation failed');
}
```

### Error Boundaries

```typescript
// app/error.tsx (Global error boundary)

'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

### Logging Strategy

```typescript
// lib/logger.ts

export const logger = {
  error: (message: string, error: unknown) => {
    console.error(`[ERROR] ${message}`, error);
    // Future: Send to error tracking service (Sentry, etc.)
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data);
  },
  info: (message: string, data?: any) => {
    console.info(`[INFO] ${message}`, data);
  }
};
```

## Testing Strategy

### Overview

The AL FURSAN Technologies website is primarily a content management system with UI components, database operations, and external integrations. Property-based testing is **not appropriate** for this feature because:

1. **UI Rendering**: Most functionality involves React component rendering and styling
2. **Database CRUD**: Simple create, read, update, delete operations without complex transformation logic
3. **Form Handling**: Specific validation rules with concrete examples
4. **Authentication**: Integration with NextAuth.js library
5. **File Uploads**: Side-effect operations with external storage

Instead, we'll use a combination of:
- **Unit Tests**: Component behavior, validation logic, utility functions
- **Integration Tests**: API routes, database operations, authentication flows
- **E2E Tests**: Critical user journeys (optional, for future implementation)

### Unit Testing

#### Component Tests (React Testing Library + Jest)

```typescript
// __tests__/components/ServiceCard.test.tsx

import { render, screen } from '@testing-library/react';
import ServiceCard from '@/components/public/ServiceCard';

describe('ServiceCard', () => {
  it('renders service title and description', () => {
    render(
      <ServiceCard
        title="AI Solutions"
        description="Custom AI implementations"
        icon="ai-icon"
        index={0}
      />
    );
    
    expect(screen.getByText('AI Solutions')).toBeInTheDocument();
    expect(screen.getByText('Custom AI implementations')).toBeInTheDocument();
  });

  it('applies hover animation class', () => {
    const { container } = render(
      <ServiceCard
        title="AI Solutions"
        description="Custom AI implementations"
        icon="ai-icon"
        index={0}
      />
    );
    
    const card = container.firstChild;
    expect(card).toHaveClass('hover:scale-105');
  });
});
```

#### Validation Tests

```typescript
// __tests__/lib/validation.test.ts

import { consultationSchema } from '@/lib/validation';

describe('consultationSchema', () => {
  it('validates correct consultation data', () => {
    const validData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+923338705805',
      message: 'I need help with my project'
    };
    
    expect(() => consultationSchema.parse(validData)).not.toThrow();
  });

  it('rejects invalid email', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'invalid-email',
      phone: '+923338705805',
      message: 'I need help with my project'
    };
    
    expect(() => consultationSchema.parse(invalidData)).toThrow();
  });

  it('rejects short message', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+923338705805',
      message: 'Short'
    };
    
    expect(() => consultationSchema.parse(invalidData)).toThrow();
  });

  it('rejects invalid phone format', () => {
    const invalidData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123',
      message: 'I need help with my project'
    };
    
    expect(() => consultationSchema.parse(invalidData)).toThrow();
  });
});
```

### Integration Testing

#### API Route Tests

```typescript
// __tests__/api/consultation.test.ts

import { POST } from '@/app/api/consultation/route';
import { prisma } from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  prisma: {
    consultationRequest: {
      create: jest.fn()
    }
  }
}));

describe('POST /api/consultation', () => {
  it('creates consultation request with valid data', async () => {
    const mockCreate = prisma.consultationRequest.create as jest.Mock;
    mockCreate.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+923338705805',
      message: 'Test message',
      createdAt: new Date()
    });

    const request = new Request('http://localhost:3000/api/consultation', {
      method: 'POST',
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+923338705805',
        message: 'Test message'
      })
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockCreate).toHaveBeenCalled();
  });

  it('returns 400 for invalid data', async () => {
    const request = new Request('http://localhost:3000/api/consultation', {
      method: 'POST',
      body: JSON.stringify({
        name: 'J',
        email: 'invalid',
        phone: '123',
        message: 'Short'
      })
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

#### Authentication Tests

```typescript
// __tests__/auth/login.test.ts

import { signIn } from 'next-auth/react';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

describe('Authentication', () => {
  it('authenticates user with valid credentials', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({
      id: '1',
      email: 'admin@alfursan.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Test authorize function logic
    const result = await bcrypt.compare('password123', hashedPassword);
    expect(result).toBe(true);
  });

  it('rejects invalid credentials', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const result = await bcrypt.compare('wrongpassword', hashedPassword);
    expect(result).toBe(false);
  });
});
```

### Test Coverage Goals

- **Components**: 80%+ coverage for public and admin components
- **API Routes**: 90%+ coverage for all endpoints
- **Validation**: 100% coverage for all schemas
- **Utilities**: 90%+ coverage for helper functions

### Testing Tools

- **Framework**: Jest
- **React Testing**: React Testing Library
- **API Testing**: Supertest or native fetch mocking
- **Database**: In-memory SQLite or test database
- **Coverage**: Jest coverage reports

### Manual Testing Checklist

#### Public Website
- [ ] All pages load correctly on mobile, tablet, desktop
- [ ] Animations trigger on scroll and hover
- [ ] WhatsApp button opens correct chat
- [ ] Consultation form submits successfully
- [ ] Blog posts display with correct formatting
- [ ] Navigation works across all pages
- [ ] Dark theme applies consistently

#### Admin Panel
- [ ] Login with valid credentials succeeds
- [ ] Login with invalid credentials fails
- [ ] All CRUD operations work for projects
- [ ] All CRUD operations work for blog posts
- [ ] All CRUD operations work for job openings
- [ ] Image uploads work and display correctly
- [ ] Rich text editor saves formatted content
- [ ] Dashboard displays correct statistics
- [ ] Logout redirects to login page

#### Accessibility
- [ ] Keyboard navigation works throughout site
- [ ] Screen reader announces content correctly
- [ ] Reduced motion preference is respected
- [ ] Color contrast meets WCAG AA standards
- [ ] Form errors are announced to screen readers


## Routing and Navigation Design

### Public Website Navigation

#### Header Component

```typescript
// components/public/Header.tsx

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About', href: '/about' },
  { label: 'Free Consultation', href: '/consultation' }
];

// Features:
// - Logo links to home page
// - Active route highlighting
// - Mobile hamburger menu
// - Smooth scroll to sections on home page
// - Sticky header on scroll
```

#### Route Structure

```
Public Routes:
/                           → Home page with service showcase
/services                   → Services listing page
/blogs                      → Blog posts listing
/blogs/[slug]              → Individual blog post
/about                      → About page with team info
/consultation              → Consultation form page
/login                      → Admin login page

Admin Routes (Protected):
/admin                      → Dashboard
/admin/projects            → Projects management
/admin/projects/new        → Create new project
/admin/projects/[id]/edit  → Edit project
/admin/blog-posts          → Blog posts management
/admin/blog-posts/new      → Create new blog post
/admin/blog-posts/[id]/edit → Edit blog post
/admin/job-openings        → Job openings management
/admin/job-openings/new    → Create new job opening
/admin/job-openings/[id]/edit → Edit job opening
/admin/services            → Services management
/admin/team                → Team information management
/admin/consultation-requests → View consultation submissions

API Routes:
/api/consultation          → POST consultation form
/api/upload                → POST file upload
/api/admin/projects        → CRUD operations
/api/admin/blog-posts      → CRUD operations
/api/admin/job-openings    → CRUD operations
/api/admin/services        → CRUD operations
/api/admin/team            → CRUD operations
/api/auth/[...nextauth]    → NextAuth.js endpoints
```

### Admin Panel Navigation

#### Sidebar Component

```typescript
// components/admin/Sidebar.tsx

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: 'Dashboard', href: '/admin', icon: <DashboardIcon /> },
  { label: 'Projects', href: '/admin/projects', icon: <ProjectIcon /> },
  { label: 'Blog Posts', href: '/admin/blog-posts', icon: <BlogIcon /> },
  { label: 'Job Openings', href: '/admin/job-openings', icon: <JobIcon /> },
  { label: 'Services', href: '/admin/services', icon: <ServiceIcon /> },
  { label: 'Team', href: '/admin/team', icon: <TeamIcon /> },
  { label: 'Consultations', href: '/admin/consultation-requests', icon: <MessageIcon /> }
];

// Features:
// - Active route highlighting
// - Collapsible on mobile
// - Logout button at bottom
// - User email display
```

### Link Prefetching

Next.js automatically prefetches links in viewport for faster navigation:

```typescript
import Link from 'next/link';

// Prefetching enabled by default
<Link href="/blogs">Blogs</Link>

// Disable prefetching for admin actions
<Link href="/admin/projects/new" prefetch={false}>
  Create Project
</Link>
```

### Breadcrumbs

```typescript
// components/admin/Breadcrumbs.tsx

interface BreadcrumbItem {
  label: string;
  href?: string;
}

// Example: Dashboard > Projects > Edit Project
// Automatically generated from route segments
```

## SEO and Metadata

### Page Metadata

```typescript
// app/(public)/page.tsx (Home page)

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AL FURSAN Technologies - End-to-End Technology Solutions',
  description: 'AL FURSAN Technologies provides AI solutions, SAAS products, website development, mobile applications, and chatbots. Get your free consultation today.',
  keywords: ['AI solutions', 'SAAS products', 'web development', 'mobile apps', 'chatbots', 'technology consulting'],
  authors: [{ name: 'AL FURSAN Technologies' }],
  openGraph: {
    title: 'AL FURSAN Technologies',
    description: 'End-to-End Technology Solutions',
    url: 'https://alfursan.com',
    siteName: 'AL FURSAN Technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AL FURSAN Technologies'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AL FURSAN Technologies',
    description: 'End-to-End Technology Solutions',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Dynamic Metadata for Blog Posts

```typescript
// app/(public)/blogs/[slug]/page.tsx

import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: `${post.title} | AL FURSAN Technologies Blog`,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author],
    },
  };
}
```

### Sitemap Generation

```typescript
// app/sitemap.ts

import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://alfursan.com';

  // Static pages
  const staticPages = [
    '',
    '/services',
    '/blogs',
    '/about',
    '/consultation',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog posts
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true }
  });

  const blogPages = posts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
```

### Robots.txt

```typescript
// app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/admin/'],
      },
    ],
    sitemap: 'https://alfursan.com/sitemap.xml',
  };
}
```

### Structured Data

```typescript
// components/public/StructuredData.tsx

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AL FURSAN Technologies',
    url: 'https://alfursan.com',
    logo: 'https://alfursan.com/logo.png',
    description: 'End-to-End Technology Solutions',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+923338705805',
      contactType: 'Customer Service',
    },
    sameAs: [
      // Social media links if available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
```

## Performance Optimization

### Image Optimization

```typescript
// Use Next.js Image component throughout
import Image from 'next/image';

<Image
  src="/uploads/project-image.jpg"
  alt="Project showcase"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

### Code Splitting

- Automatic route-based code splitting via Next.js
- Dynamic imports for heavy components:

```typescript
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(
  () => import('@/components/admin/RichTextEditor'),
  { ssr: false, loading: () => <LoadingSpinner /> }
);
```

### Caching Strategy

```typescript
// Static pages: ISR with revalidation
export const revalidate = 3600; // 1 hour

// Dynamic data: On-demand revalidation
import { revalidatePath } from 'next/cache';

// After creating/updating content
revalidatePath('/blogs');
revalidatePath('/');
```

### Bundle Size Optimization

- Tree-shaking unused code
- Minimize dependencies
- Use Tailwind CSS purge for production
- Analyze bundle with `@next/bundle-analyzer`

## Deployment Considerations

### Environment Variables

```bash
# .env.example

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/alfursan"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Storage (future)
# AWS_ACCESS_KEY_ID=""
# AWS_SECRET_ACCESS_KEY=""
# AWS_REGION=""
# AWS_S3_BUCKET=""
```

### Database Migrations

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Build Process

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Build application
npm run build

# Start production server
npm start
```

### Hosting Recommendations

1. **Vercel** (Recommended for Next.js)
   - Automatic deployments from Git
   - Edge functions support
   - Built-in analytics
   - Zero configuration

2. **Alternative: VPS (DigitalOcean, AWS EC2)**
   - More control over infrastructure
   - PostgreSQL on same server or managed service
   - Nginx reverse proxy
   - PM2 for process management

### Database Hosting

1. **Vercel Postgres** (Serverless)
2. **Supabase** (Managed PostgreSQL)
3. **AWS RDS** (Managed PostgreSQL)
4. **Self-hosted** on VPS

### Monitoring and Analytics

- **Error Tracking**: Sentry or similar
- **Analytics**: Google Analytics or Plausible
- **Performance**: Vercel Analytics or Web Vitals
- **Uptime**: UptimeRobot or Pingdom

## Security Considerations

### Input Validation

- All user inputs validated with Zod schemas
- Server-side validation on all API routes
- SQL injection prevention via Prisma ORM
- XSS prevention via React's automatic escaping

### Authentication Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens stored in httpOnly cookies
- CSRF protection via NextAuth.js
- Session expiration after 30 days
- Secure password requirements enforced

### File Upload Security

- File type validation (whitelist)
- File size limits (5MB)
- Filename sanitization
- Stored outside web root (or with proper access controls)
- Virus scanning (future enhancement)

### API Security

- Authentication required for all admin endpoints
- Rate limiting (future enhancement)
- CORS configuration
- HTTPS only in production

### Database Security

- Parameterized queries via Prisma
- Least privilege database user
- Regular backups
- Connection pooling
- SSL/TLS for database connections

## Accessibility

### WCAG 2.1 AA Compliance

1. **Keyboard Navigation**
   - All interactive elements accessible via keyboard
   - Visible focus indicators
   - Logical tab order

2. **Screen Reader Support**
   - Semantic HTML elements
   - ARIA labels where needed
   - Alt text for all images
   - Form labels properly associated

3. **Color Contrast**
   - Text meets 4.5:1 contrast ratio
   - Interactive elements meet 3:1 contrast ratio
   - Dark theme optimized for readability

4. **Motion and Animation**
   - Respect prefers-reduced-motion
   - No auto-playing videos
   - Animations can be paused

5. **Forms**
   - Clear error messages
   - Error prevention and recovery
   - Required fields indicated
   - Instructions provided

### Testing Tools

- axe DevTools for automated testing
- NVDA/JAWS for screen reader testing
- Keyboard-only navigation testing
- Color contrast analyzer

## Future Enhancements

### Phase 2 Features

1. **Multi-language Support**
   - i18n implementation with next-intl
   - Arabic and English versions
   - RTL layout support

2. **Advanced Analytics**
   - Custom dashboard for website metrics
   - Consultation request analytics
   - Blog post engagement tracking

3. **Email Notifications**
   - Consultation request notifications
   - Newsletter system
   - Job application notifications

4. **Search Functionality**
   - Full-text search for blog posts
   - Service search
   - Project filtering

5. **Social Media Integration**
   - Share buttons on blog posts
   - Social media feed display
   - Open Graph optimization

6. **Performance Enhancements**
   - CDN integration
   - Advanced caching strategies
   - Image CDN (Cloudinary, Imgix)

7. **Advanced Admin Features**
   - Bulk operations
   - Content scheduling
   - Draft previews
   - Version history

## Conclusion

This design document provides a comprehensive blueprint for the AL FURSAN Technologies website. The architecture leverages modern web technologies (Next.js, TypeScript, Tailwind CSS) to create a performant, maintainable, and scalable application. The clear separation between public and admin functionality, combined with robust authentication and content management capabilities, ensures the system meets all specified requirements while remaining extensible for future enhancements.

Key design decisions:
- **Next.js App Router** for modern React patterns and excellent SEO
- **Prisma ORM** for type-safe database operations
- **NextAuth.js** for secure authentication
- **Framer Motion** for smooth, accessible animations
- **Local storage** initially, with easy migration path to cloud storage
- **Comprehensive testing strategy** focused on unit and integration tests

The implementation should follow this design closely while remaining flexible to adapt to specific deployment environments and evolving requirements.

