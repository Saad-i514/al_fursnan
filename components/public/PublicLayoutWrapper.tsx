'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function PublicLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show header/footer on admin or login pages
  const isPublicPage = !pathname.startsWith('/admin') && !pathname.startsWith('/login');

  if (!isPublicPage) {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative', zIndex: 2, display: 'contents' }}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton phoneNumber="+923338705805" />
    </div>
  );
}
