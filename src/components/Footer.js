'use client';

import Dialog from './Dialog';
import { RiCake3Line } from '@remixicon/react';
import { useEffect, useState } from 'react';

const Footer = () => {
  const [useCookies, setUseCookies] = useState(false);
  useEffect(() => {
    const isUseCookies = localStorage.getItem('useCookies');
    setUseCookies(isUseCookies);
  }, [useCookies]);

  const handleOkClick = () => {
    localStorage.setItem('useCookies', true);
  };

  return (
    <footer className="mb-8 text-light-black text-sm">
      <section>
        <ul className="flex gap-2 underline">
          <li>
            <a className="hover:text-light-primary" href="/policy?index=1">
              شروط الخدمة
            </a>
          </li>
          <li>
            <a className="hover:text-light-primary" href="/policy?index=2">
              سياسة الكوكيز
            </a>
          </li>
          <li>
            <a className="hover:text-light-primary" href="/policy?index=3">
              سياسة الخصوصية
            </a>
          </li>
        </ul>
        <div>جميع الحقوق محفوظة &copy; 2024</div>
      </section>
      {useCookies === null && (
        <Dialog
          okButtonTitle="قبول"
          closeButtonTitle="رفض"
          onOk={handleOkClick}
        >
          <div className="my-4">
            <RiCake3Line size={48} className="text-light-onSurfaceVariant" />
            <header>
              <h1>نحن نستخدم الكوكيز</h1>
            </header>
            <p>
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
