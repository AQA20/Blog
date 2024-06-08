import './styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { fetchArticles } from '@/lib';
import { Noto_Sans_Arabic } from 'next/font/google';
import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import CookiesDialog from '@/components/CookiesDialog';
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

  const article = articles[0];
  const webDesc =
    'استكشف أحدث المقالات والاكتشافات في مجالات اللياقة البدنية والتغذية الصحية عبر موقعنا. نقدم معلومات علمية موثوقة ونصائح عملية لتحقيق أهدافك الصحية والرياضية بأفضل الطرق.';

  // Generate metadata dynamically based on fetched article data
  const metadata = {
    title: '500Kalima موقع',
    description: webDesc,
    // Open Graph (OG) tags
    ogTitle: '500Kalima موقع',
    ogDescription: webDesc,
    ogImage: article.featuredImg,
    ogUrl: `https://500kalima.com/`,
    canonicalUrl: `https://500kalima.com/`,
    keywords: 'صحة,لياقة,تمارين,غذاء صحي',
    language: 'ar',
  };

  return (
    <>
      <Head>
        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph (OG) tags */}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        {/* Other metadata */}
        <link rel="canonical" href={metadata.canonicalUrl} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="language" content={metadata.language} />
      </Head>
      <html
        className={`pt-4 scroll-smooth ${noto_sans_arabic.variable}`}
        lang="ar"
        dir="rtl"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className="w-full xl:w-[680px] font-noto bg-light-surface dark:bg-dark-surface">
            <main className="md:flex min-height">
              <section className="w-full">
                <Suspense fallback={<p>...loading navbar content</p>}>
                  <Navbar />
                </Suspense>
                <div className="px-3 xl:w-[680px]">
                  <section className="mb-6">
                    <Suspense fallback={<h3>...loading articles</h3>}>
                      {children}
                    </Suspense>
                  </section>
                </div>
              </section>
              <aside className="hidden xl:block">
                <Suspense fallback={<p>...loading sidebar content</p>}>
                  <Sidebar articles={articles} />
                </Suspense>
              </aside>
            </main>
            <div className="px-3">
              <Suspense fallback={<p>...loading footer content</p>}>
                <Footer />
              </Suspense>
            </div>
            <CookiesDialog />
          </body>
        </ThemeProvider>
      </html>
    </>
  );
}
