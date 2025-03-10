import { NextResponse } from 'next/server';
import { globby } from 'globby';
import fs from 'fs';
import matter from 'gray-matter';

// Force static generation
export const dynamic = 'force-static';

export async function GET() {
  // Get all MDX files from content directories
  const files = await globby([
    'content/blog/**/*.mdx',
  ]);

  const searchIndex = await Promise.all(
    files.map(async (file) => {
      const source = fs.readFileSync(file, 'utf8');
      const { data, content } = matter(source);
      
      // Extract the slug correctly from the file path
      // For example, from 'content/blog/mdx-showcase/index.mdx' to 'mdx-showcase'
      const slug = file
        .replace('content/blog/', '')
        .replace(/\/index\.mdx$/, '');

      return {
        title: data.title,
        description: data.description || '',
        category: file.includes('/blog/') ? 'blog' : 
                 file.includes('/research/') ? 'research' : 'people',
        slug,
        content: content
      };
    })
  );

  return NextResponse.json(searchIndex);
} 