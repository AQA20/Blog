'use client';

import { useEffect } from 'react';
import { Noto_Sans_Arabic } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const noto_sans_arabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600', '700'],
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
});

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <html className={`pt-4 ${noto_sans_arabic.variable}`} lang="en">
      <body className="md:w-[680px] font-noto">
        <main className="md:flex">
          <section>
            <div className="px-3 md:w-[680px]">
              <section className="mb-6 min-height">
                <p className="text-light-error">{error.message}</p>
                <button onClick={reset}>المحاولة مرة اخرى</button>
              </section>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
