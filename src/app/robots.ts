import { MetadataRoute } from 'next';

// Force static generation
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: 'https://iict.heig-vd.ch/sitemap.xml',
  };
} 