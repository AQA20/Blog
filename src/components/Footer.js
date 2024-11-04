'use client';

import { useSearchParams } from 'next/navigation';

const Footer = () => {
  const searchParams = useSearchParams();

  // Convert searchParams to a string for stable dependency
  const searchParamsString = searchParams.toString();

  const activeClass = (url) => {
    return searchParamsString && url.includes(searchParamsString)
      ? 'active'
      : '';
  };

  return (
    <footer className="my-8 text-light-black text-sm">
      <section>
        <ul className="flex gap-2 underline dark:decoration-dark-outlineVariant">
          <li>
            <a
              className={`hover:text-light-primary dark:text-dark-onSurfaceVariant hover:dark:text-dark-primary ${activeClass('index=1')}`}
              href="/policy?index=1"
            >
              شروط الخدمة
            </a>
          </li>
          <li>
            <a
              className={`hover:text-light-primary dark:text-dark-onSurfaceVariant hover:dark:text-dark-primary ${activeClass('index=2')}`}
              href="/policy?index=2"
            >
              سياسة الخصوصية
            </a>
          </li>
          <li>
            <a
              className={`hover:text-light-primary dark:text-dark-onSurfaceVariant hover:dark:text-dark-primary ${activeClass('index=3')}`}
              href="/policy?index=3"
            >
              سياسة الكوكيز
            </a>
          </li>
          <li>
            <a
              className={`hover:text-light-primary dark:text-dark-onSurfaceVariant hover:dark:text-dark-primary ${activeClass('index=3')}`}
              href="/api/sitemap.xml"
            >
              خريطة الموقع
            </a>
          </li>
        </ul>
        <div className="dark:text-dark-onSurfaceVariant">
          جميع الحقوق محفوظة &copy; 2024
        </div>
      </section>
    </footer>
  );
};

export default Footer;
