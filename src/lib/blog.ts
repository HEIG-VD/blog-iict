import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPostMetadata } from '../types/blog';

const POSTS_PATH = path.join(process.cwd(), 'content/blog');

// Helper function to copy all files from a directory to another directory
const copyDirectoryContents = (sourceDir: string, targetDir: string) => {
  // Create the target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Read all files in the source directory
  const files = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  // Copy each file to the target directory
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file.name);
    const targetPath = path.join(targetDir, file.name);
    
    if (file.isDirectory()) {
      // Recursively copy subdirectories
      copyDirectoryContents(sourcePath, targetPath);
    } else if (file.name !== 'index.mdx') {
      // Skip the index.mdx file as we don't need to copy it
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
};

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
        
        // Copy all files from the blog post directory to the public directory
        const sourceDir = path.join(POSTS_PATH, directory);
        const targetDir = path.join(process.cwd(), 'public', 'blog', directory);
        copyDirectoryContents(sourceDir, targetDir);
        
        // Update image path if it exists
        const imageData = data.image;
        if (imageData && typeof imageData === 'string' && !imageData.startsWith('http') && !imageData.startsWith('/')) {
          data.image = `/blog/${directory}/${imageData}`;
        }
        
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
    
    // Copy all files from the blog post directory to the public directory
    const sourceDir = path.join(POSTS_PATH, slug);
    const targetDir = path.join(process.cwd(), 'public', 'blog', slug);
    copyDirectoryContents(sourceDir, targetDir);
    
    // Update image path if it exists
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