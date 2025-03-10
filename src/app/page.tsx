import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Accueil | HEIG-VD IICT',
  description: 'Bienvenue à l&apos;Institut des Technologies de l&apos;Information et de la Communication (IICT) de la HEIG-VD.',
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();
  const posts = allPosts.slice(0, 6); // Show first 6 posts on home page

  return (
    <main className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Institut des Technologies de l&apos;information et de la communication
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
            De l&apos;idée à la réalisation ! À la HEIG-VD, l&apos;IICT trace la voie vers un futur novateur, repoussant les frontières de l&apos;informatique et des télécommunications avec une équipe de chercheurs passionnés et expérimentés.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
              <Link href={`/blog/${post.slug}/`} className="flex-1">
                <div className="relative h-48 w-full overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#e1251b]">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500 line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString('fr-CH', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {allPosts.length > 9 && (
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-block px-6 py-3 border border-[#e1251b] text-[#e1251b] rounded-md text-sm font-medium hover:bg-[#e1251b] hover:text-white transition-colors"
            >
              Voir tous les articles
            </Link>
          </div>
        )}
      </div>
    </main>
  );
} 