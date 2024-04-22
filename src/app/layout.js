import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { api } from '@/lib';

import { Noto_Sans_Arabic } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

export default async function RootLayout({ children }) {
  try {
    const {
      data: { data },
    } = await api.get('/sidebar/articles');

    return (
      <html className={`pt-4 ${noto_sans_arabic.variable}`} lang="ar" dir="rtl">
        <body className="md:w-[680px] font-noto">
          <main className="md:flex">
            <section>
              <Navbar />
              <div className="px-3 md:w-[680px]">
                <section className="mb-6 min-height">{children}</section>
              </div>
            </section>
            <aside className="hidden md:block">
              <Sidebar articles={data} />
            </aside>
          </main>
          <div className="px-3">
            <Footer />
          </div>
        </body>
      </html>
    );
  } catch (error) {
    console.error(error);
  }
}
