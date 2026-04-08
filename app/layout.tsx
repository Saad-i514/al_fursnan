import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PublicLayoutWrapper from "@/components/public/PublicLayoutWrapper";
import ParticleBackground from "@/components/shared/ParticleBackground";
import SessionProviderWrapper from "@/components/shared/SessionProviderWrapper";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AL FURSAN Technologies - End-to-End Technology Solutions",
  description: "AL FURSAN Technologies provides AI solutions, SAAS products, website development, mobile applications, and chatbots. Get your free consultation today.",
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col antialiased" suppressHydrationWarning>
        <SessionProviderWrapper>
          <ParticleBackground />
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </SessionProviderWrapper>
        <Analytics />
      </body>
    </html>
  );
}
