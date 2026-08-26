import type { Metadata, Viewport } from 'next';
import './globals.css';
import raviFont from '@/public/font';
import NeedTop from '@/components/proflow/ui/NeedTop';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://pirroot.site'),
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
  authors: [{ name: 'سینا پیرزاده', url: 'https://pirroot.site' }],
  creator: 'سینا پیرزاده',
  openGraph: {
    title: 'سینا پیرزاده | Front-End Developer',
    description: 'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack.',
    url: 'https://pirroot.site',
    siteName: 'سینا پیرزاده',
    locale: 'fa_IR',
    type: 'website',
    images: [
      {
        url: '/profile.webp',
        width: 1200,
        height: 630,
        alt: 'سینا پیرزاده',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سینا پیرزاده | Front-End Developer',
    description: 'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack.',
    images: ['/profile.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <NeedTop />
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
