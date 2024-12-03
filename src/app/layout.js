import './styles/globals.css';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
const DynamicFooter = dynamic(() => import('@/components/Footer'));
const DynamicSidebar = dynamic(() => import('@/components/Sidebar'));
import { Noto_Sans_Arabic } from 'next/font/google';
import { Suspense } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NotificationProvider } from '@/providers/NotificationProvider';
import CookieConsentManager from '@/components/CookieConsentManager';
import { GoogleAnalytics } from '@next/third-parties/google';

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
        width: 940,
        height: 788,
      },
    ],
    locale: 'ar_AR',
    type: 'website',
  },
  facebook: {
    app: {
      id: '759672193042879',
    },
  },
  canonicalUrl: 'https://500kalima.com/',
  keywords: 'صحة,لياقة,تمارين,غذاء صحي',
  language: 'ar',
};

export default async function RootLayout({ children }) {
  return (
    <html
      className={`pt-4 scroll-smooth ${noto_sans_arabic.variable}`}
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >
      <body className="w-full font-noto bg-surface">
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <NotificationProvider>
            <main className="md:flex min-height">
              <section className="w-full">
                <Suspense>
                  <Navbar />
                </Suspense>
                <div className="px-3 xl:w-[680px] xl:px-0">
                  <section className="mb-6">
                    <Suspense>{children}</Suspense>
                  </section>
                </div>
              </section>
              <aside className="hidden xl:block">
                <Suspense>
                  <DynamicSidebar />
                </Suspense>
              </aside>
            </main>
            <div className="px-3">
              <Suspense>
                <DynamicFooter />
              </Suspense>
            </div>
            <CookieConsentManager />
          </NotificationProvider>
        </NextThemesProvider>
      </body>
      <GoogleAnalytics gaId="G-VWF93TCR92" />
    </html>
  );
}
