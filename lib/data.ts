import type { SVGProps } from 'react';

import GithubIcon from '@/components/icons/GithubIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';

/* ═══════════════════════ Structured Data (SEO) ═══════════════════════ */
export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'سینا پیرزاده',
  alternateName: 'pirroot',
  jobTitle: 'Full-Stack Web Developer',
  url: 'https://github.com/pirroot',
  email: 'mailto:pirzadehroot@gmail.com',
  telephone: '+98-936-473-3583',
  sameAs: [
    'https://github.com/pirroot',
    'https://linkedin.com/in/pirroot',
    'https://instagram.com/pirroot',
    'https://t.me/pirroot',
  ],
  knowsAbout: ['Next.js', 'FastAPI', 'React.js', 'Python', 'PostgreSQL', 'Docker', 'SEO'],
};

/* ═══════════════════════ Stack ═══════════════════════ */
export const stack = [
  'Next.js',
  'FastAPI',
  'Nest.js',
  'React.js',
  'Tailwind',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'SEO',
  'Node.js',
  'REST API',
];

/* ═══════════════════════ Roles (Typewriter) ═══════════════════════ */
export const roles = [
  'Full-Stack Developer',
  'Next.js Expert',
  'Fast Api Craftsman',
  'SEO-First Engineer',
];

/* ═══════════════════════ Navigation ═══════════════════════ */
export const navLinks = [
  { href: '#experience', label: 'سوابق' },
  { href: '#projects', label: 'پروژه‌ها' },
  { href: '#contact', label: 'ارتباط' },
];

/* ═══════════════════════ Terminal ═══════════════════════ */
export const termLines = [
  {
    cmd: 'stack --top 3',
    out: 'next.js · fast api · typescript',
    cls: 'text-[#E9B44C]',
  },
] as const;

/* ═══════════════════════ Experience ═══════════════════════ */
export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  desc: string;
  tags: string[];
  current?: boolean;
}

export const experience: ExperienceItem[] = [
  {
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی.',
    tags: ['Next.js', 'Fast Api', 'PostgreSQL', 'SEO'],
    current: true,
  },
  {
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز و مقیاس‌پذیر.',
    tags: ['Next.js', 'Fast Api', 'Tailwind'],
  },
  {
    company: 'آرام گستر',
    role: 'برنامه‌نویس وب',
    period: '۱۳۹۹ — ۱۴۰۴',
    desc: 'طراحی و توسعه سایت‌های شرکتی و خدماتی.',
    tags: ['Next.js', 'Node.js'],
  },
  {
    company: 'باران مسیح',
    role: 'برنامه‌نویس Mid-Level',
    period: '۱۳۹۸ — ۱۴۰۱',
    desc: 'همکاری در تیم فنی توسعه محصولات وب.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
];

/* ═══════════════════════ Projects ═══════════════════════ */
export type ProjectCat = 'shop' | 'app';

export interface Project {
  title: string;
  desc: string;
  stack: string;
  href: string;
  cat: ProjectCat;
}

export const projects: Project[] = [
  {
    title: 'ایران پکیج',
    desc: 'پلتفرم آموزشگاهی و فروشگاهی با رابط کاربری ریسپانسیو، مدیریت محتوا و ارتباط با APIهای بک‌اند.',
    stack: 'Next.js · FastAPI',
    href: 'https://iranpakage.com/',
    cat: 'shop',
  },
  {
    title: 'وب‌سایت Bellanzo',
    desc: 'وب‌سایت فروشگاهی مدرن با طراحی ریسپانسیو، تجربه کاربری روان و توجه به اصول سئو تکنیکال.',
    stack: 'Next.js · PostgreSQL · SEO',
    href: 'https://bellanzo-home.ir/',
    cat: 'shop',
  },
  {
    title: 'سایت خبری Rahkar Javan',
    desc: 'پلتفرم خبری با تمرکز بر انتشار و مدیریت محتوا، طراحی ریسپانسیو و بهینه‌سازی برای موتورهای جستجو.',
    stack: 'Next.js · PostgreSQL · SEO',
    href: 'https://rahkarjavan.ir/',
    cat: 'app',
  },
  {
    title: 'پلتفرم آموزشگاهی رایا',
    desc: 'سامانه آموزشگاهی با رابط کاربری مدرن و ارتباط با بک‌اند برای ارائه خدمات و مدیریت اطلاعات آموزشی.',
    stack: 'Next.js · Django REST Framework',
    href: 'https://github.com/pirroot/Raya',
    cat: 'app',
  },
];

/* ═══════════════════════ Project Categories ═══════════════════════ */
export const cats = [
  { id: 'all', l: 'همه' },
  { id: 'shop', l: 'فروشگاهی' },
  { id: 'app', l: 'آموزشگاهی' },
] as const;

export type CatId = (typeof cats)[number]['id'];

/* ═══════════════════════ Socials ═══════════════════════ */
export interface Social {
  name: string;
  handle: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}

export const socials: Social[] = [
  { name: 'گیت‌هاب', handle: 'pirroot', href: 'https://github.com/pirroot', icon: GithubIcon },
  {
    name: 'لینکدین',
    handle: 'pirroot',
    href: 'https://linkedin.com/in/pirroot',
    icon: LinkedinIcon,
  },
  {
    name: 'اینستاگرام',
    handle: 'pirroot',
    href: 'https://instagram.com/pirroot',
    icon: InstagramIcon,
  },
  { name: 'تلگرام', handle: '@pirroot', href: 'https://t.me/pirroot', icon: TelegramIcon },
];

/* ═══════════════════════ Contact ═══════════════════════ */
export const CONTACT = {
  phone: '09364733583',
  phoneFa: '۰۹۳۶۴۷۳۳۵۸۳',
  email: 'pirzadehroot@gmail.com',
  karlancer: 'https://karlancer.com/profile/1241439',
  resumePdf: 'https://github.com/pirroot/pirroot/blob/main/resume.pdf',
};
