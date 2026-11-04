/**
 * Seed script — fills the database with the original static content
 * so the site keeps working exactly as before, plus the default admin.
 *
 * Run:  node prisma/seed.mjs   (سازگار با npm — بدون نیاز به tsx یا bun)
 */
import prismaPkg from '@prisma/client';
const { PrismaClient } = prismaPkg;
import { randomBytes, scryptSync } from 'node:crypto';

const prisma = new PrismaClient();

/* ── password hashing (same algorithm as src/lib/auth.ts) ── */
function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

const roles = [
  'Full-Stack Developer',
  'Next.js Expert',
  'Fast Api Craftsman',
  'SEO-First Engineer',
];
const stack = [
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

const heroBio =
  'وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js , Fast Api می‌سازم؛ کدی می‌نویسم که هم سریع بار می‌شود، هم برای موتورهای جستجو خواناست و هم بعد از ماه‌ها هنوز قابل نگهداری و توسعه بماند.';

const settings = {
  siteName: 'سینا پیرزاده',
  jobTitle: 'Full-Stack Web Developer',
  heroBio,
  roles: JSON.stringify(roles),
  stack: JSON.stringify(stack),
  phone: '09364733583',
  email: 'pirzadehroot@gmail.com',
  karlancer: 'https://karlancer.com/profile/1241439',
  resumePdf: 'https://github.com/pirroot/pirroot/blob/main/resume.pdf',
  metaDesc:
    'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack با تمرکز بر Next.js، React و TypeScript.',
};

const projects = [
  {
    order: 1,
    title: 'ایران پکیج',
    desc: 'پلتفرم آموزشگاهی و فروشگاهی با رابط کاربری ریسپانسیو، مدیریت محتوا و ارتباط با APIهای بک‌اند.',
    stack: 'Next.js · FastAPI',
    href: 'https://iranpakage.com/',
    cat: 'shop',
  },
  {
    order: 2,
    title: 'وب‌سایت Bellanzo',
    desc: 'وب‌سایت فروشگاهی مدرن با طراحی ریسپانسیو، تجربه کاربری روان و توجه به اصول سئو تکنیکال.',
    stack: 'Next.js · PostgreSQL · SEO',
    href: 'https://bellanzo-home.ir/',
    cat: 'shop',
  },
  {
    order: 3,
    title: 'سایت خبری Rahkar Javan',
    desc: 'پلتفرم خبری با تمرکز بر انتشار و مدیریت محتوا، طراحی ریسپانسیو و بهینه‌سازی برای موتورهای جستجو.',
    stack: 'Next.js · PostgreSQL · SEO',
    href: 'https://rahkarjavan.ir/',
    cat: 'app',
  },
  {
    order: 4,
    title: 'پلتفرم آموزشگاهی رایا',
    desc: 'سامانه آموزشگاهی با رابط کاربری مدرن و ارتباط با بک‌اند برای ارائه خدمات و مدیریت اطلاعات آموزشی.',
    stack: 'Next.js · Django REST Framework',
    href: 'https://github.com/pirroot/Raya',
    cat: 'app',
  },
];

const experiences = [
  {
    order: 1,
    company: 'ایران‌کتاب',
    role: 'توسعه‌دهنده Full-Stack / سئو',
    period: '۱۴۰۴ — اکنون',
    desc: 'توسعه بک‌اند و فرانت‌اند، بهینه‌سازی سئو و پشتیبانی فنی پلتفرم فروشگاهی.',
    tags: JSON.stringify(['Next.js', 'Fast Api', 'PostgreSQL', 'SEO']),
    current: true,
  },
  {
    order: 2,
    company: 'بارش',
    role: 'توسعه‌دهنده Front-End و Back-End',
    period: '۱۴۰۲ — ۱۴۰۴',
    desc: 'توسعه وب‌اپلیکیشن‌های سفارشی با معماری تمیز و مقیاس‌پذیر.',
    tags: JSON.stringify(['Next.js', 'Fast Api', 'Tailwind']),
    current: false,
  },
  {
    order: 3,
    company: 'آرام گستر',
    role: 'برنامه‌نویس وب',
    period: '۱۳۹۹ — ۱۴۰۴',
    desc: 'طراحی و توسعه سایت‌های شرکتی و خدماتی.',
    tags: JSON.stringify(['Next.js', 'Node.js']),
    current: false,
  },
  {
    order: 4,
    company: 'باران مسیح',
    role: 'برنامه‌نویس Mid-Level',
    period: '۱۳۹۸ — ۱۴۰۱',
    desc: 'همکاری در تیم فنی توسعه محصولات وب.',
    tags: JSON.stringify(['React', 'Node.js', 'PostgreSQL']),
    current: false,
  },
];

const socials = [
  { order: 1, name: 'گیت‌هاب', handle: 'pirroot', href: 'https://github.com/pirroot', iconKey: 'github' },
  { order: 2, name: 'لینکدین', handle: 'pirroot', href: 'https://linkedin.com/in/pirroot', iconKey: 'linkedin' },
  { order: 3, name: 'اینستاگرام', handle: 'pirroot', href: 'https://instagram.com/pirroot', iconKey: 'instagram' },
  { order: 4, name: 'تلگرام', handle: '@pirroot', href: 'https://t.me/pirroot', iconKey: 'telegram' },
];

async function main() {
  /* admin — only create if none exists */
  const adminCount = await prisma.admin.count();
  if (adminCount === 0) {
    await prisma.admin.create({
      data: { username: 'pirroot', passwordHash: hashPassword('dev8090100') },
    });
    console.log('✔ admin created →  admin / admin1234');
  } else {
    console.log('• admin already exists, skipped');
  }

  /* settings — upsert so re-running never destroys user edits */
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log('✔ settings ready');

  /* content — only seed when tables are empty */
  if ((await prisma.project.count()) === 0) {
    await prisma.project.createMany({ data: projects });
    console.log('✔ projects seeded');
  }
  if ((await prisma.experience.count()) === 0) {
    await prisma.experience.createMany({ data: experiences });
    console.log('✔ experience seeded');
  }
  if ((await prisma.social.count()) === 0) {
    await prisma.social.createMany({ data: socials });
    console.log('✔ socials seeded');
  }

  console.log('✅ seed done  →  ورود: admin / admin1234  ⚠️ بعد از اولین ورود رمز را از بخش تنظیمات عوض کن');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
