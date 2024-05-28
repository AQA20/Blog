import './styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { fetchArticles } from '@/lib';
import { Noto_Sans_Arabic } from 'next/font/google';
import { Suspense } from 'react';
import { Providers } from './providers';
import Head from 'next/head';

// If loading a variable font, you don't need to specify the font weight
const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

export default async function RootLayout({ children }) {
  const { articles } = await fetchArticles({
    orderBy: 'views',
    order: 'DESC',
    limit: 3,
  });

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
      </Head>
      <html
        className={`pt-4 scroll-smooth ${noto_sans_arabic.variable} dark:bg-dark-surface`}
        lang="ar"
        dir="rtl"
        suppressHydrationWarning
      >
        <Providers>
          <body className="md:w-[680px] font-noto">
            <main className="md:flex min-height">
              <section>
                <Suspense fallback="...loading">
                  <Navbar />
                </Suspense>
                <div className="px-3 md:w-[680px]">
                  <section className="mb-6">
                    <Suspense fallback="...loading articles">
                      {children}
                    </Suspense>
                  </section>
                </div>
              </section>
              <aside className="hidden md:block">
                <Suspense fallback="...loading">
                  <Sidebar articles={articles} />
                </Suspense>
              </aside>
            </main>
            <div className="px-3">
              <Suspense fallback="...loading">
                <Footer />
              </Suspense>
            </div>
          </body>
        </Providers>
      </html>
    </>
  );
}
