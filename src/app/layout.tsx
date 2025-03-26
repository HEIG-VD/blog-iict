import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import Search from "@/components/Search";
import 'katex/dist/katex.min.css';
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.institute.baseUrl),
  title: {
    default: `${siteConfig.institute.school} ${siteConfig.institute.name}`,
    template: `%s | ${siteConfig.institute.school} ${siteConfig.institute.name}`
  },
  description: `${siteConfig.institute.fullName} (${siteConfig.institute.name}) de la ${siteConfig.institute.school}`,
  keywords: [siteConfig.institute.school, siteConfig.institute.name, 'recherche', 'formation', 'technologie', 'informatique', 'communication'],
  authors: [{ name: `${siteConfig.institute.school} ${siteConfig.institute.name}` }],
  creator: `${siteConfig.institute.school} ${siteConfig.institute.name}`,
  publisher: siteConfig.institute.school,
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CH',
    url: siteConfig.institute.baseUrl,
    siteName: `${siteConfig.institute.school} ${siteConfig.institute.name}`,
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: `${siteConfig.institute.school} ${siteConfig.institute.name}`
    }]
  },
  twitter: {
    card: 'summary_large_image',
    site: `@${siteConfig.social.twitter}`,
    creator: `@${siteConfig.social.twitter}`
  },
  alternates: {
    canonical: siteConfig.institute.baseUrl,
    types: {
      'application/rss+xml': `${siteConfig.institute.baseUrl}/feed.xml`,
    },
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* KaTeX CSS is already imported at the top of the file */}
      </head>
      <body className={`antialiased bg-gray-50 min-h-screen flex flex-col`}>
        <header>
          <div className="max-w-7xl mx-auto pt-14 pb-4 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-iict.svg"
                  alt="Logo HEIG-VD"
                  width={150}
                  height={49}
                  priority
                  className="w-[220px] h-auto"
                />
              </Link>
              <div className="flex items-center gap-8">
                <nav className="flex items-center gap-8">
                  <Link 
                    href="/blog" 
                    className="text-gray-600 hover:text-red-600 transition-colors"
                  >
                    Archives
                  </Link>
                  <Link 
                    href={siteConfig.institute.url}
                    className="text-gray-600 hover:text-red-600 transition-colors"
                    target="_blank"
                  >
                    Institut
                  </Link>
                </nav>
                <div className="w-64">
                  <Search />
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-auto">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Informations HEIG-VD */}
              <div>
                <Link href="https://www.heig-vd.ch" target="_blank" rel="noopener noreferrer" className="block mb-4">
                  <Image
                    src="/logo-heig-vd.svg"
                    alt={`Logo ${siteConfig.institute.school}`}
                    width={150}
                    height={49}
                    className="w-[80px] h-auto"
                  />
                </Link>
                <p className="text-sm text-gray-600">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.postBox}<br />
                  {siteConfig.address.city}
                </p>
              </div>
              
              {/* Liens rapides */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Liens rapides</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="https://www.heig-vd.ch" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Site Web {siteConfig.institute.school}
                    </Link>
                  </li>
                  <li>
                    <Link href={siteConfig.institute.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Site Web {siteConfig.institute.name}
                    </Link>
                  </li>
                  <li>
                    <Link href="/feed.xml" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      RSS Feed
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Suivez-nous */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Suivez-nous</h3>
                <ul className="space-y-3">
                  <li>
                    <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href={`https://twitter.com/${siteConfig.social.twitter}`} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-red-600 transition-colors">
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>

              {/* Mentions légales */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Mentions légales</h3>
                <p className="text-sm text-gray-600">
                  © {new Date().getFullYear()} {siteConfig.institute.school}.<br />
                  Tous droits réservés.
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  Nous n&apos;utilisons pas de cookies ni de trackers sur ce blog.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
