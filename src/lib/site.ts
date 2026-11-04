/**
 * Site data layer — the public site reads everything from the database
 * (edited via the admin panel). If the DB is empty or unreachable it
 * gracefully falls back to the original static content in lib/data.ts,
 * so the site NEVER breaks.
 */
import { db } from '@/lib/db';
import {
  CONTACT,
  experience as defaultExperience,
  projects as defaultProjects,
  roles as defaultRoles,
  socials as defaultSocials,
  stack as defaultStack,
  type ContactInfo,
  type ExperienceItem,
  type Project,
  type ProjectCat,
  type Social,
  type SocialIconKey,
} from '@/lib/data';
import { toFa } from '@/lib/utils';

/* ═══════════════════════ Types ═══════════════════════ */
export interface SiteSettings {
  siteName: string;
  jobTitle: string;
  heroBio: string;
  roles: string[];
  stack: string[];
  phone: string;
  email: string;
  karlancer: string;
  resumePdf: string;
  metaDesc: string;
}

export interface SiteData {
  settings: SiteSettings;
  experience: ExperienceItem[];
  projects: Project[];
  socials: Social[];
  contact: ContactInfo;
}

/* ═══════════════════════ Defaults (static content) ═══════════════════════ */
const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'سینا پیرزاده',
  jobTitle: 'Full-Stack Web Developer',
  heroBio:
    'وب‌اپلیکیشن‌ها و فروشگاه‌های اینترنتی را با Next.js , Fast Api می‌سازم؛ کدی می‌نویسم که هم سریع بار می‌شود، هم برای موتورهای جستجو خواناست و هم بعد از ماه‌ها هنوز قابل نگهداری و توسعه بماند.',
  roles: [...defaultRoles],
  stack: [...defaultStack],
  phone: CONTACT.phone,
  email: CONTACT.email,
  karlancer: CONTACT.karlancer,
  resumePdf: CONTACT.resumePdf,
  metaDesc:
    'پورتفولیو شخصی سینا پیرزاده، توسعه‌دهنده Front-End و Full-Stack با تمرکز بر Next.js، React و TypeScript.',
};

function safeParseArray(raw: string | undefined, fallback: string[]): string[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed.map(String) : fallback;
  } catch {
    return fallback;
  }
}

function safeTags(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

/* ═══════════════════════ Fetch from DB with fallback ═══════════════════════ */
export async function getSiteData(): Promise<SiteData> {
  try {
    const [settingRows, expRows, projRows, socialRows] = await Promise.all([
      db.setting.findMany(),
      db.experience.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
      db.project.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
      db.social.findMany({ where: { visible: true }, orderBy: { order: 'asc' } }),
    ]);

    const map = new Map(settingRows.map((s) => [s.key, s.value]));
    const pick = (key: string, fallback: string) => map.get(key)?.trim() || fallback;

    const settings: SiteSettings = {
      siteName: pick('siteName', DEFAULT_SETTINGS.siteName),
      jobTitle: pick('jobTitle', DEFAULT_SETTINGS.jobTitle),
      heroBio: pick('heroBio', DEFAULT_SETTINGS.heroBio),
      roles: safeParseArray(map.get('roles'), DEFAULT_SETTINGS.roles),
      stack: safeParseArray(map.get('stack'), DEFAULT_SETTINGS.stack),
      phone: pick('phone', DEFAULT_SETTINGS.phone),
      email: pick('email', DEFAULT_SETTINGS.email),
      karlancer: pick('karlancer', DEFAULT_SETTINGS.karlancer),
      resumePdf: pick('resumePdf', DEFAULT_SETTINGS.resumePdf),
      metaDesc: pick('metaDesc', DEFAULT_SETTINGS.metaDesc),
    };

    const experience: ExperienceItem[] =
      expRows.length > 0
        ? expRows.map((e) => ({
            company: e.company,
            role: e.role,
            period: e.period,
            desc: e.desc,
            tags: safeTags(e.tags),
            current: e.current,
          }))
        : defaultExperience;

    const projects: Project[] =
      projRows.length > 0
        ? projRows.map((p) => ({
            title: p.title,
            desc: p.desc,
            stack: p.stack,
            href: p.href,
            cat: p.cat as ProjectCat,
          }))
        : defaultProjects;

    const socials: Social[] =
      socialRows.length > 0
        ? socialRows.map((s) => ({
            name: s.name,
            handle: s.handle,
            href: s.href,
            iconKey: s.iconKey as SocialIconKey,
          }))
        : defaultSocials;

    const contact: ContactInfo = {
      phone: settings.phone,
      email: settings.email,
      karlancer: settings.karlancer,
      resumePdf: settings.resumePdf,
    };

    return { settings, experience, projects, socials, contact };
  } catch (err) {
    console.error('[site] DB read failed, using static fallback:', err);
    return {
      settings: DEFAULT_SETTINGS,
      experience: defaultExperience,
      projects: defaultProjects,
      socials: defaultSocials,
      contact: CONTACT,
    };
  }
}

/* ═══════════════════════ JSON-LD builder ═══════════════════════ */
export function buildJsonLd(site: SiteData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.settings.siteName,
    jobTitle: site.settings.jobTitle,
    email: `mailto:${site.settings.email}`,
    telephone: `+98-${site.settings.phone.replace(/^0/, '')}`,
    sameAs: site.socials.map((s) => s.href),
    knowsAbout: site.settings.stack,
  };
}

/* phone in Persian digits (for the contact card) */
export function phoneFa(phone: string): string {
  return toFa(phone);
}
