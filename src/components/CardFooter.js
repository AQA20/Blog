'use client';

import Tag from './Tag';
import Hug from './Hug';
import { RiShareLine } from '@remixicon/react';
import { useState } from 'react';
import Notification from './Notification';

const CardFooter = ({ clipboardContent, tags = [], shareText = true }) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const onShare = async () => {
    await navigator.clipboard.writeText(
      `${window.location.href}${clipboardContent}`,
    );
    setCopyNotification(true);
  };

  return (
    <section className="min-w-full">
      <Notification
        onClose={() => setCopyNotification(false)}
        isShow={copyNotification}
        type="copy"
        text="تم نسخ الرابط بنجاح!."
      />
      <footer className="h-14 flex items-center justify-between">
        <div className="flex truncate">
          <div className="truncate">
            {tags.map((tag) => (
              <Tag key={tag.id} name={tag.name} />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          {shareText ? (
            <button
              onClick={onShare}
              className="sm:flex rounded-full gap-2 py-[5px] pr-4 pl-3 justify-between items-center"
            >
              <p className="text-light-primary hidden sm:block">مشاركة</p>
              <RiShareLine size="20" className="fill-light-primary" />
            </button>
          ) : (
            <Hug onClick={onShare}>
              <RiShareLine size="20" className="fill-light-primary" />
            </Hug>
          )}
        </div>
      </footer>
      <hr className="mt-2 mb-6" />
    </section>
  );
};

export default CardFooter;
