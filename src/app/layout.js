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
        <body className="w-full xl:w-[680px] font-noto dark:bg-dark-surface">
          <main className="md:flex min-height">
            <section className="w-full">
              <Suspense fallback={<h3>...loading navbar content</h3>}>
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
              <Suspense fallback={<h3>...loading sidebar content</h3>}>
                <Sidebar articles={articles} />
              </Suspense>
            </aside>
          </main>
          <div className="px-3">
            <Suspense fallback={<h3>...loading footer content</h3>}>
              <Footer />
            </Suspense>
          </div>
          <CookiesDialog />
        </body>
      </ThemeProvider>
    </html>
  );
}
