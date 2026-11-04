import type { ComponentType, SVGProps } from 'react';

import GithubIcon from '@/components/icons/GithubIcon';
import InstagramIcon from '@/components/icons/InstagramIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';
import type { SocialIconKey } from '@/lib/data';

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export const SOCIAL_ICONS: Record<SocialIconKey, IconComponent> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
};

export const SOCIAL_ICON_KEYS = Object.keys(SOCIAL_ICONS) as SocialIconKey[];

export function getSocialIcon(key: string): IconComponent {
  return SOCIAL_ICONS[key as SocialIconKey] ?? GithubIcon;
}

export const SOCIAL_LABELS: Record<SocialIconKey, string> = {
  github: 'گیت‌هاب',
  linkedin: 'لینکدین',
  instagram: 'اینستاگرام',
  telegram: 'تلگرام',
};
