'use client';

import Dialog from './Dialog';
import Cake3Line from './iconComponents/Cake3Line';

const CookiesDialog = ({ onAccept }) => {
  return (
    <div className="fixed z-10">
      <Dialog okButtonTitle="قبول" closeButtonTitle="رفض" onOk={onAccept}>
        <div className="my-4">
          <Cake3Line
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
};

export default CookiesDialog;
