import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Login | AL FURSAN Technologies',
  description: 'Sign in to access the AL FURSAN Technologies admin panel',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
