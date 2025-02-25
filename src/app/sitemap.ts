import { getBlogPosts } from '@/lib/blog';
import { MetadataRoute } from 'next';

// Force static generation
export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getBlogPosts();
  
  // Base URLs
  const routes = [
    '',
    '/blog',
  ].map((route) => ({
    url: `https://iict.heig-vd.ch${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Blog post URLs
  const blogUrls = blogPosts.map((post) => ({
    url: `https://iict.heig-vd.ch/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogUrls];
} 