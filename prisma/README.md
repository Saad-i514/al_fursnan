# Database Setup

## Overview

This project uses PostgreSQL via Supabase with Prisma ORM for database management.

## Initial Setup Completed

✅ Prisma client generated
✅ Initial migration created and applied
✅ Database seeded with initial data

## Database Schema

The database includes the following tables:
- **User**: Admin authentication
- **BlogPost**: Blog articles with publishing workflow
- **JobOpening**: Job listings with active/inactive status
- **Project**: Portfolio showcase items
- **Service**: Company service offerings
- **TeamMember**: CEO and Founder information
- **ConsultationRequest**: Contact form submissions

## Seeded Data

The seed script (`prisma/seed.ts`) populates:

### Admin User
- Email: `admin@alfursan.com`
- Password: `admin123` (⚠️ Change this in production!)

### Services (6 items)
1. AI Solutions
2. AI Automations
3. SAAS Products
4. Website Solutions
5. Mobile Applications
6. Chatbots

### Team Members
- CEO: Muhammad Saad
- Founder: Muhammad Saad

## Common Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations in production
npx prisma migrate deploy

# Seed the database
npx prisma db seed

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (⚠️ deletes all data)
npx prisma migrate reset
```

## Environment Variables

Required in `.env`:
```
DATABASE_URL="postgresql://..."  # Connection pooler URL
DIRECT_URL="postgresql://..."    # Direct connection for migrations
```

## Notes

- The seed script uses `upsert` operations, so it's safe to run multiple times
- Admin password is hashed using bcrypt with 10 salt rounds
- All timestamps use PostgreSQL's TIMESTAMP(3) for millisecond precision
- Indexes are created for frequently queried fields (published status, active jobs, etc.)
