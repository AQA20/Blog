import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }) {
  return (
    <html className="pt-2" lang="ar" dir="rtl">
      <body className="md:w-[680px] font-noto">
        <main className="md:flex">
          <section>
            <Navbar />
            <div className="px-3 md:w-[680px]">
              <section className="mb-6 min-height">{children}</section>
            </div>
          </section>
          <aside className="hidden md:block">
            <Sidebar />
          </aside>
        </main>
        <div className="px-3">
          <Footer />
        </div>
      </body>
    </html>
  );
}
