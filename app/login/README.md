# Login Page

This is the admin login page for AL FURSAN Technologies website.

## Features

- **Email and Password Fields**: Standard login form with email and password inputs
- **Client-Side Validation**: Uses Zod schema for form validation
  - Email must be a valid email address
  - Password is required
- **Error Display**: Shows validation errors and authentication errors
- **Dark Theme**: Styled with the AL FURSAN dark theme colors
- **Loading State**: Displays a spinner while authenticating
- **NextAuth Integration**: Uses NextAuth.js credentials provider for authentication

## Testing the Login Page

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/login`

3. To test with valid credentials, you need to:
   - Ensure the database is set up and seeded with a user
   - Use the seeded admin credentials (check `prisma/seed.ts`)

4. Test cases:
   - **Invalid email format**: Enter "test" in email field → Should show "Invalid email address"
   - **Empty password**: Leave password blank → Should show "Password is required"
   - **Invalid credentials**: Enter wrong email/password → Should show "Invalid email or password"
   - **Valid credentials**: Enter correct credentials → Should redirect to `/admin`

## Implementation Details

- **Location**: `app/login/page.tsx`
- **Type**: Client Component (uses `'use client'` directive)
- **Validation**: Zod schema (`loginSchema`)
- **Authentication**: NextAuth.js `signIn` function with credentials provider
- **Routing**: Next.js App Router with `useRouter` hook
- **Styling**: Tailwind CSS with custom dark theme colors

## Related Files

- `app/login/layout.tsx` - Layout with metadata for SEO
- `app/api/auth/[...nextauth]/route.ts` - NextAuth configuration
- `lib/auth.ts` - Auth helper functions
