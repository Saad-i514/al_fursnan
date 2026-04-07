# AL FURSAN Technologies Website

A modern, full-stack website for AL FURSAN Technologies built with Next.js 14+, TypeScript, and Tailwind CSS. Features a dark-themed public website with animations and a secure admin panel for content management.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Image Optimization**: Next.js Image + sharp
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Edit `.env` and add your database URL and NextAuth secret:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/alfursan"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

3. Set up the database:

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public-facing pages
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   └── login/             # Login page
├── components/
│   ├── public/            # Public website components
│   ├── admin/             # Admin panel components
│   └── shared/            # Shared components
├── lib/                   # Utility functions
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## Features

### Public Website
- Animated service showcase
- Blog system with rich content
- Project portfolio
- Job openings display
- Free consultation form
- WhatsApp integration
- Dark theme with smooth animations
- Fully responsive design

### Admin Panel
- Secure authentication
- Content management for:
  - Projects
  - Blog posts
  - Job openings
  - Services
  - Team information
- Image upload and optimization
- Rich text editor for blog posts
- Dashboard with statistics

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Database commands
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create and apply migrations
npx prisma generate        # Generate Prisma Client
```

## License

Copyright © 2024 AL FURSAN Technologies. All rights reserved.
