'use client';

import Tag from './Tag';
import Hug from './Hug';
import { RiShareLine } from '@remixicon/react';
import { useState } from 'react';
import Notification from './Notification';

const CardFooter = ({ tags = [], shareText = true }) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const onShare = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopyNotification(true);
  };

  return (
    <section className="min-w-full">
      {/* //Todo fix element being showed on mouseenter & touchstart after unmount */}
      {/* A temporarily fix for notification mouseenter & touchstart issue (this removes animation) */}
      {copyNotification && (
        <Notification
          onShow={() => setCopyNotification(true)}
          onClose={() => setCopyNotification(false)}
          isShow={copyNotification}
          type="copy"
          text="تم نسخ الرابط بنجاح!."
        />
      )}

      <footer className="h-14 flex items-center justify-between">
        <div className="flex">
          <div className="truncate">
            {tags.map((tag) => (
              <Tag key={tag.id} name={tag.name} />
            ))}
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
