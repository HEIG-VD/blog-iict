export interface BlogPostMetadata {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  tags?: string[];
  image?: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
} 