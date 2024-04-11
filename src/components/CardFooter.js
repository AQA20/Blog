'use client';

import Tag from './Tag';
import Hug from './Hug';
import { RiShareLine } from '@remixicon/react';
import { useState } from 'react';
import Notification from './Notification';

const CardFooter = ({ shareText = true }) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const onShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopyNotification(true);
  };
  return (
    <section className="min-w-full">
      <div>
        <Notification
          onShow={() => setCopyNotification(true)}
          onClose={() => setCopyNotification(false)}
          isShow={copyNotification}
          type="copy"
          text="تم نسخ الرابط بنجاح!."
        />
      </div>

      <footer className="h-14 flex items-center justify-between">
        <div className="truncate flex">
          <div className="truncate">
            <Tag name="المستكشف" />
            <Tag name="الباني البارع" />
            <Tag name="السعادة البشرية" />
            <Tag name="السعادة البشرية" />
          </div>
        </div>
        <div className="flex items-center">
          {shareText && (
            <p className="hidden md:block text-light-primary align-start">
              مشاركة
            </p>
          )}
          <div>
            <Hug onClick={onShare}>
              <RiShareLine size="20" className="fill-light-primary" />
            </Hug>
          </div>
        </div>
      </footer>
      <hr className="mt-2 mb-6" />
    </section>
  );
};

export default CardFooter;
