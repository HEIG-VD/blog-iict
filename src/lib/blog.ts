import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostMetadata } from '../types/blog';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

export const getBlogPosts = async (): Promise<BlogPostMetadata[]> => {
  try {
    const directories = fs.readdirSync(POSTS_PATH, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    const posts = directories
      .map(directory => {
        const filePath = path.join(POSTS_PATH, directory, 'index.mdx');
        
        if (!fs.existsSync(filePath)) {
          return null;
        }
        
        const source = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(source);
        
        return {
          ...(data as BlogPostMetadata),
          slug: directory,
        };
      })
      .filter((post): post is BlogPostMetadata => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return posts;
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
};

export const getBlogPostBySlug = async (slug: string) => {
  try {
    const filePath = path.join(POSTS_PATH, slug, 'index.mdx');
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const source = fs.readFileSync(filePath, 'utf8');
    
    const { data, content } = matter(source);
    
    // Update image path to be relative to the post directory if it's not a full URL
    const imageData = data.image;
    if (imageData && typeof imageData === 'string' && !imageData.startsWith('http') && !imageData.startsWith('/')) {
      data.image = `/blog/${slug}/${imageData}`;
    }
    
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