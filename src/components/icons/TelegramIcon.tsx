import type { SVGProps } from 'react';

export default function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.5 3.5 2.7 11c-.9.35-.9 1.6.03 1.9l4.6 1.5 1.8 5.6c.3.9 1.4 1.1 2 .4l2.5-2.9 4.6 3.4c.8.6 1.9.15 2.1-.8l3.2-14.6c.25-1.1-.8-2-1.9-1.6ZM8.4 13.7l9.3-6c.3-.2.6.15.3.4l-7.7 7.1-.3 3.3-1.6-4.8Z" />
    </svg>
  );
}
