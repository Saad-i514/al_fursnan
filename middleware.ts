import { withAuth } from 'next-auth/middleware';

// Middleware to protect admin routes
export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // User is authorized if they have a valid token
      return !!token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

// Protect all /admin and /api/admin routes
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
