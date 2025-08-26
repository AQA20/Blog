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
  ' استمتع بقراءة مقالات ملهمة ومعلومات قيمة في مختلف المجالات  بما في ذلك الصحة، التكنولوجيا، الثقافة، الرياضة,الاقتصاد, اخبار,وثائقيات, منوعات والمزيد...!';

export const metadata = {
  title: '500Kalima موقع',
  description: webDesc,
  openGraph: {
    // Open Graph (OG) tags
    title: 'تصفح اخر المقالات على موقع 500 كلمة',
    description: webDesc,
    url: process.env.NEXT_JS_URL,
    siteName: '500kalima',
    images: [
      {
        url: `${process.env.NEXT_JS_URL}/default-featured-img.png`, // Must be an absolute URL
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
  canonicalUrl: process.env.NEXT_JS_URL,
  keywords:
    'مواضيع شيقة، معلومات مفيدة، ثقافة، صحة، تكنولوجيا، أخبار، اقتصاد, رياضة, منوعات, وثائقيات,مقالات عامة',
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
      <head>
        <meta name="google-adsense-account" content="ca-pub-3218714329930969" />
      </head>
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
