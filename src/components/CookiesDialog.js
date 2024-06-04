'use client';

import Dialog from './Dialog';
import { RiCake3Line } from '@remixicon/react';
import { useEffect, useState } from 'react';

const CookiesDialog = () => {
  const [useCookies, setUseCookies] = useState(null);

  useEffect(() => {
    const isUseCookies = localStorage.getItem('useCookies');
    setUseCookies(isUseCookies);
  }, [useCookies]);

  const handleOkClick = () => {
    localStorage.setItem('useCookies', true);
  };

  if (useCookies === null) {
    return (
      <div className="fixed z-10">
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
      </div>
    );
  }
};

export default CookiesDialog;
