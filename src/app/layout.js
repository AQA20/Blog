import './styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { fetchArticles } from '@/lib';
import { Noto_Sans_Arabic } from 'next/font/google';
import { Suspense } from 'react';
import { ThemeProvider } from 'next-themes';
import CookiesDialog from '@/components/CookiesDialog';

// If loading a variable font, you don't need to specify the font weight
const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

const webDesc =
  'استكشف أحدث المقالات والاكتشافات في مجال اللياقة البدنية والتغذية الصحية';

export const metadata = {
  title: '500Kalima موقع',
  description: webDesc,
  openGraph: {
    // Open Graph (OG) tags
    title: 'تصفح اخر المقالات على موقع 500 كلمة',
    description: webDesc,
    url: 'https://500kalima.com/',
    siteName: '500kalima',
    images: [
      {
        url: 'https://500kalima.com/default-featured-img.png', // Must be an absolute URL
        width: 680,
        height: 510,
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  canonicalUrl: 'https://500kalima.com/',
  keywords: 'صحة,لياقة,تمارين,غذاء صحي',
  language: 'ar',
};

export default async function RootLayout({ children }) {
  const { articles } = await fetchArticles({
    orderBy: 'views',
    order: 'DESC',
    limit: 3,
  });

  return (
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
              <Suspense>
                <Navbar />
              </Suspense>
              <div className="px-3 xl:w-[680px]">
                <section className="mb-6">
                  <Suspense>{children}</Suspense>
                </section>
              </div>
            </section>
            <aside className="hidden xl:block">
              <Suspense>
                <Sidebar articles={articles} />
              </Suspense>
            </aside>
          </main>
          <div className="px-3">
            <Suspense>
              <Footer />
            </Suspense>
          </div>
          <CookiesDialog />
        </body>
      </ThemeProvider>
    </html>
  );
}
