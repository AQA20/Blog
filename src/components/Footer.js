'use client';

import Dialog from './Dialog';
import { RiCake3Line } from '@remixicon/react';

const Footer = () => {
  return (
    <footer className="mb-8 text-light-black text-sm">
      <section>
        <ul className="flex gap-2 underline">
          <li>
            <a href="/policy?index=1">شروط الخدمة</a>
          </li>
          <li>
            <a href="/policy?index=2">سياسة الكوكيز</a>
          </li>
          <li>
            <a href="/policy?index=3">سياسة الخصوصية</a>
          </li>
        </ul>
        <div>جميع الحقوق محفوظة &copy; 2024</div>
      </section>
      <Dialog okButtonTitle="قبول" closeButtonTitle="رفض" onOk={() => null}>
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
    </footer>
  );
};

export default Footer;
