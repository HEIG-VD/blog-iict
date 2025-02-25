import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostMetadata } from '../types/blog';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export const getBlogPosts = async (): Promise<BlogPostMetadata[]> => {
  try {
    const files = fs.readdirSync(POSTS_PATH);
    const posts = files
      .filter((file) => file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(POSTS_PATH, file);
        const source = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(source);
        
        return {
          ...(data as BlogPostMetadata),
          slug: file.replace('.mdx', ''),
        };
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
    const source = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(source);
    
    return {
      ...(data as BlogPostMetadata),
      slug,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}; 