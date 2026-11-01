import raviFont from '@/lib/fonts';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { getSiteData } from '@/lib/site';

/* ═══════════════════════ Metadata (SEO) — dynamic from DB ═══════════════════════ */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteData();
  const name = site.settings.siteName;

  return {
    metadataBase: new URL('https://pirroot.site'),
    title: {
      default: name,
      template: `%s | ${name}`,
    },
    description: site.settings.metaDesc,
    keywords: [
      name,
      'Front-End Developer',
      'Full-Stack Developer',
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'برنامه‌نویس',
      'توسعه‌دهنده وب',
    ],
    authors: [{ name, url: 'https://pirroot.site' }],
    creator: name,
    publisher: name,

    verification: {
      google: 'VPXy0Ny3_5gff7w1FY-sBLYTD4rl1PB_wCk-AWW8Vsw',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
    alternates: {
      canonical: 'https://pirroot.site',
    },

    openGraph: {
      title: `${name} | ${site.settings.jobTitle}`,
      description: site.settings.metaDesc,
      url: 'https://pirroot.site',
      siteName: name,
      locale: 'fa_IR',
      type: 'website',
      images: [
        {
          url: '/profile.webp',
          width: 1200,
          height: 630,
          alt: `${name} - ${site.settings.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} | ${site.settings.jobTitle}`,
      description: site.settings.metaDesc,
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
}

/* ═══════════════════════ Viewport ═══════════════════════ */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0B1210' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1210' },
  ],
};

/* ═══════════════════════ Root Layout ═══════════════════════ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`scroll-smooth ${raviFont.variable}`}>
      <body className="min-h-screen flex flex-col antialiased bg-[#0B1210] text-[#EDF3EF] relative">
        {children}
      </body>
    </html>
  );
}
