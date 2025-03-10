import { getBlogPosts } from '@/lib/blog';

// Force static generation
export const dynamic = 'force-static';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
  author: string;
  tags?: string[];
}

function generateRssItem(post: BlogPost) {
  return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>https://iict.heig-vd.ch/blog/${post.slug}/</link>
      <guid>https://iict.heig-vd.ch/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
      <author>contact@heig-vd.ch (${post.author})</author>
      ${post.tags ? post.tags.map((tag: string) => `<category>${tag}</category>`).join('') : ''}
    </item>
  `;
}

function generateRss(posts: BlogPost[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Blog HEIG-VD IICT</title>
        <link>https://iict.heig-vd.ch/blog/</link>
        <description>Actualités et articles de l'Institut des Technologies de l'Information et de la Communication (IICT) de la HEIG-VD</description>
        <language>fr-CH</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="https://iict.heig-vd.ch/feed.xml" rel="self" type="application/rss+xml"/>
        ${posts.map(generateRssItem).join('')}
      </channel>
    </rss>`;
}

export async function GET() {
  const posts = await getBlogPosts();
  const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return new Response(generateRss(sortedPosts), {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=18000',
    },
  });
} 