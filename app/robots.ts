import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/', // جلوگیری از ایندکس شدن API ها
    },
    sitemap: 'https://pirroot.site/sitemap.xml',
  }
}
