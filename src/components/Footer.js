'use client';

import Dialog from './Dialog';
import { RiCake3Line } from '@remixicon/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Footer = () => {
  const [useCookies, setUseCookies] = useState(false);
  const searchParams = useSearchParams();

  // Convert searchParams to a string for stable dependency
  const searchParamsString = searchParams.toString();

  const activeClass = (url) => {
    return searchParamsString && url.includes(searchParamsString)
      ? 'active'
      : '';
  };

  useEffect(() => {
    const isUseCookies = localStorage.getItem('useCookies');
    setUseCookies(isUseCookies);
  }, [useCookies]);

  const handleOkClick = () => {
    localStorage.setItem('useCookies', true);
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
        </ul>
        <div className="dark:text-dark-onSurfaceVariant">
          جميع الحقوق محفوظة &copy; 2024
        </div>
      </section>
      {useCookies === null && (
        <Dialog
          okButtonTitle="قبول"
          closeButtonTitle="رفض"
          onOk={handleOkClick}
        >
          <div className="my-4">
            <RiCake3Line
              size={48}
              className="text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant"
            />
            <header>
              <h1 className="dark:text-dark-onSurfaceVariant">
                نحن نستخدم الكوكيز
              </h1>
            </header>
            <p className="dark:text-dark-onSurfaceVariant">
              الكوكيز مثل البسكويت أو الكيك ولكن لجهازك,وهي مفيدة لإعطاءك أفضل
              تجربة على موقعنا. فهل تقبل بالسماح لنا باستخدام الكوكيز؟
            </p>
          </div>
        </Dialog>
      )}
    </footer>
  );
};

export default Footer;
