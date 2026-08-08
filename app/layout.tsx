import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Wanderfolk — Meet People. Not Dates.',
  description:
    'Genuine friendships with people around the world. Explore meaningful connections across countries, cultures, and conversations.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  openGraph: {
    title: 'Wanderfolk — Meet People. Not Dates.',
    description:
      'Genuine friendships with people around the world. Explore meaningful connections across countries, cultures, and conversations.',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
