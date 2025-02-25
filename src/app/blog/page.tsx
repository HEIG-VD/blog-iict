import Link from 'next/link';
import { getBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog | HEIG-VD IICT',
  description: 'Découvrez les dernières nouvelles, projets et innovations de l&apos;Institut des Technologies de l&apos;Information et de la Communication.',
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  // Get unique tags
  const tags = Array.from(new Set(allPosts.flatMap(post => post.tags || [])))
    .sort((a, b) => a.localeCompare(b));

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Actualités et Publications de l&apos;IICT
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed mb-8">
            Découvrez les dernières nouvelles, projets et innovations de l&apos;Institut des Technologies de l&apos;Information et de la Communication. Notre blog présente les avancées de nos recherches, les événements marquants et les réussites de notre communauté académique.
          </p>
          
          {tags.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Thèmes</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${encodeURIComponent(tag)}`}
                    className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-[#e1251b] hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
              <div className="flex-1 p-6">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#e1251b]">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                    {post.description}
                  </p>
                </Link>
                <div className="mt-4">
                  <div className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('fr-CH', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${encodeURIComponent(tag)}`}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-[#e1251b] hover:text-white transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
} 