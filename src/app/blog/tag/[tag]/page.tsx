import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ tag: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  return {
    title: `Articles tagués "${tag}" | HEIG-VD IICT`,
    description: `Découvrez tous nos articles sur le thème "${tag}" - Institut des Technologies de l'Information et de la Communication.`,
    alternates: {
      canonical: `/blog/tag/${encodeURIComponent(tag)}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const tags = new Set(posts.flatMap((post) => post.tags || []));
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }));
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const tag = decodeURIComponent(resolvedParams.tag);
  const allPosts = await getBlogPosts();
  const posts = allPosts.filter((post) => post.tags?.includes(tag));

  // Handle 404 for non-existent tags
  if (posts.length === 0) {
    notFound();
  }

  return (
    <main className="py-12" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <nav className="flex items-center gap-4 mb-6" aria-label="Retour">
            <Link 
              href="/blog"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#e1251b] transition-colors"
              aria-label="Retour à la liste des articles"
            >
              <span aria-hidden="true">←</span>
              <span className="ml-2">Retour aux articles</span>
            </Link>
          </nav>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Articles tagués « {tag} »
          </h1>
          
          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
            Découvrez tous nos articles sur le thème « {tag} ».
          </p>
        </section>

        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="feed"
          aria-label={`Liste des articles tagués ${tag}`}
        >
          {posts.map((post) => (
            <article 
              key={post.slug} 
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-[#e1251b] transition-colors duration-200"
            >
              <Link 
                href={`/blog/${post.slug}`} 
                className="flex-1 p-6"
                aria-labelledby={`article-title-${post.slug}`}
              >
                <div className="flex flex-1 flex-col h-full">
                  <div className="flex-1">
                    <h2 
                      id={`article-title-${post.slug}`}
                      className="text-xl font-bold text-gray-900 group-hover:text-[#e1251b] transition-colors duration-200"
                    >
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                  
                  <footer className="mt-4">
                    <time 
                      dateTime={post.date}
                      className="text-sm text-gray-500"
                    >
                      {new Intl.DateTimeFormat('fr-CH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      }).format(new Date(post.date))}
                    </time>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags?.map((postTag) => (
                        <span
                          key={postTag}
                          className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                            postTag === tag
                              ? 'bg-[#e1251b] text-white'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {postTag}
                        </span>
                      ))}
                    </div>
                  </footer>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 