import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import NextImage from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { mdxComponents } from '@/components/mdx-components';
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/ui/callout';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Counter } from '@/components/demo/counter';
import { InteractiveButton } from '@/components/demo/interactive-button';
import { mdxOptions } from '@/lib/mdx';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://template.heig-vd.ch';
  const imageUrl = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/default-og.jpg`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const post = await getBlogPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  const components = {
    ...mdxComponents,
    Button: Button,
    Callout: Callout,
    Card: Card,
    Image: Image,
    Counter: Counter,
    InteractiveButton: InteractiveButton,
  };

  return (
    <article>
      {/* Full width header container */}
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-4 text-xl text-gray-700 leading-relaxed">
              {post.description}
            </p>
          )}
          {post.image && (
            <div className="mt-8 relative h-[400px] w-full overflow-hidden rounded-lg">
              <NextImage
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </div>

      {/* Two column layout container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column - Metadata */}
          <aside className="lg:col-span-4">
            <div className="space-y-8">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">Author</h2>
                <p className="mt-1 text-base">{post.author}</p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase">Published</h2>
                <time dateTime={post.date} className="mt-1 block text-base">
                  {new Date(post.date).toLocaleDateString('fr-CH', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </time>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase">Tags</h2>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Right column - Content */}
          <main className="lg:col-span-8">
            <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-red-600 hover:prose-a:text-red-500 prose-img:rounded-lg">
              <MDXRemote 
                source={post.content} 
                components={components}
                options={mdxOptions}
              />
            </div>
          </main>
        </div>
      </div>
    </article>
  );
}