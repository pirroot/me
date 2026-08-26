import { Cpu, ExternalLinkIcon, GitBranch, Layout, Send, Server } from "lucide-react";

const SOCIALS = [
  { label: 'گیت‌هاب', handle: 'pirroot', href: 'https://github.com/pirroot', icon: GitBranch },
  { label: 'لینکدین', handle: 'pirroot', href: 'https://linkedin.com/in/pirroot', icon: ExternalLinkIcon },
  { label: 'اینستاگرام', handle: 'pirroot', href: 'https://instagram.com/pirroot', icon: ExternalLinkIcon },
  { label: 'تلگرام', handle: '@pirroot', href: 'https://t.me/pirroot', icon: Send },
];

const ABOUT_LINES = [
  'توسعه‌دهنده Full-Stack با تمرکز بر Next.js و NestJS',
  'طراحی رابط کاربری سریع، واکنش‌گرا و SEO-Friendly',
  'پیاده‌سازی APIهای ساختاریافته و ماژولار با NestJS',
  'مدیریت دیتابیس با PostgreSQL، Prisma و TypeORM',
  'بهینه‌سازی عملکرد و Core Web Vitals',
  'Docker، Linux و CI/CD',
  'آماده همکاری فریلنسری و ریموت',
];

const STACK = [
  {
    group: 'فرانت‌اند',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'HTML5/CSS3'],
    icon: Layout,
  },
  {
    group: 'بک‌اند',
    items: ['NestJS', 'Node.js', 'PostgreSQL', 'Prisma', 'TypeORM', 'Redis', 'FastAPI'],
    note: 'تمرکز اصلی روی NestJS است — FastAPI به‌عنوان ابزار تکمیلی.',
    icon: Server,
  },
  {
    group: 'ابزارها و دیپلوی',
    items: ['Docker', 'Linux', 'Git', 'CI/CD', 'SEO'],
    icon: Cpu,
  },
];

const EXPERIENCE = [
  {
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    stack: 'Next.js · NestJS · PostgreSQL · SEO',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی',
  },
  {
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    stack: 'Next.js · NestJS · Tailwind',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز',
  },
  {
    company: 'آرام گستر',
    role: 'برنامه‌نویس وب',
    stack: 'Next.js · Node.js',
    period: '۱۳۹۹ — ۱۴۰۴',
    desc: 'طراحی و توسعه سایت‌های شرکتی و خدماتی',
  },
  {
    company: 'باران مسیح',
    role: 'برنامه‌نویس Mid-Level',
    stack: 'React · Node.js · PostgreSQL',
    period: '۱۳۹۸ — ۱۴۰۱',
    desc: 'همکاری در تیم فنی توسعه محصولات وب',
  },
];

const PROJECTS = [
  {
    image: 'https://pirroot.site/avater_user_image/img1.webp',
    title: 'فروشگاه اینترنتی Full-Stack',
    tech: 'Next.js + NestJS + PostgreSQL',
    desc: 'طراحی و توسعه فروشگاه اینترنتی کامل با پنل ادمین، سبد خرید، درگاه پرداخت و سیستم مدیریت .',
    link: 'https://github.com/pirroot/',
  },
  {
    image: 'https://pirroot.site/avater_user_image/img2.webp',
    title: 'وب‌سایت bellanzo',
    tech: 'Next.js + PostgreSQL + SEO',
    desc: 'توسعه سایت مدرن با بهینه‌سازی سئو، ساختار مناسب موتورهای جستجو و رابط کاربری سریع.',
    link: 'https://bellanzo-home.ir/',
  },
  {
    image: 'https://pirroot.site/avater_user_image/img3.webp',
    title: 'اپلیکیشن آموزشگاهی رایا',
    tech: 'Next.js + Django REST',
    desc: 'پلتفرم آموزشگاهی و فروشگاهی با رابط کاربری ریسپانسیو و APIهای RESTful.',
    link: 'https://github.com/pirroot/Next/',
  },
];

const SKILL_TAGS = [
  'Next.js',
  'Nest.js',
  'React.js',
  'Tailwind',
  'Full Stack Developer',
  'TypeScript',
  'PostgreSQL',
  'Docker',
  'SEO',
];


const CONTACT = {
  phone: '۰۹۳۶۴۷۳۳۵۸۳',
  email: 'pirzadehroot@gmail.com',
  location: 'تهران، ایران',
  status: 'آماده همکاری ریموت',
};

export { SOCIALS, ABOUT_LINES, STACK, EXPERIENCE, PROJECTS, SKILL_TAGS, CONTACT };
