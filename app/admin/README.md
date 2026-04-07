# Admin Panel Route Protection

This directory contains the protected admin panel routes for the AL FURSAN Technologies website.

## Authentication & Authorization

### Middleware Protection (`middleware.ts`)

The root-level `middleware.ts` file protects all admin routes using NextAuth.js middleware:

- **Protected Routes**: `/admin/*` and `/api/admin/*`
- **Redirect**: Unauthenticated users are redirected to `/login`
- **Authorization**: Users must have a valid JWT token to access admin routes

### Layout Session Check (`app/admin/layout.tsx`)

The admin layout performs an additional server-side session check:

- Verifies the session using `getServerSession()`
- Redirects to `/login` if no valid session exists
- Provides a consistent layout wrapper for all admin pages

## How It Works

1. **Request to `/admin/*`**: User attempts to access an admin route
2. **Middleware Check**: `middleware.ts` intercepts the request and verifies JWT token
3. **Layout Check**: If middleware passes, the admin layout performs a server-side session verification
4. **Access Granted**: If both checks pass, the user can access the admin page
5. **Redirect**: If either check fails, user is redirected to `/login`

## Security Features

- **Double Protection**: Both middleware and layout check authentication
- **JWT-based Sessions**: Secure token-based authentication
- **Server-Side Verification**: Session checks happen on the server, not client
- **Automatic Redirects**: Seamless redirect to login for unauthenticated users

## Future Enhancements

The admin layout will be expanded in future tasks to include:
- Sidebar navigation
- User profile display
- Logout functionality
- Admin-specific styling and components
