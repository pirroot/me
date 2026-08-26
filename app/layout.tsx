import type { Metadata, Viewport } from 'next';
import './globals.css';
import raviFont from '@/public/font';
import NeedTop from '@/components/proflow/ui/NeedTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'سینا پیرزاده | Front-End Developer',
    template: '%s | سینا پیرزاده',
  },
  description:
    'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack با تمرکز بر Next.js، React و TypeScript.',
  keywords: [
    'سینا پیرزاده',
    'Front-End Developer',
    'Full-Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
  ],
  authors: [
    {
      name: 'سینا پیرزاده',
    },
  ],
  creator: 'سینا پیرزاده',
  metadataBase: new URL('https://pirroot.site'),

  openGraph: {
    title: 'سینا پیرزاده | Front-End Developer',
    description: 'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack.',
    url: 'https://pirroot.site',
    siteName: 'سینا پیرزاده',
    locale: 'fa_IR',
    type: 'website',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable}`}>
      <NeedTop />
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
