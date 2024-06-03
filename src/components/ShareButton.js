'use client';
import { useState, useEffect } from 'react';
import { RiReplyLine } from '@remixicon/react';
import Notification from './Notification';
import Hug from './Hug';
import { updateArticleShare } from '@/lib';

const ShareButton = ({
  clipboardContent,
  buttonStyle,
  id,
  shareText = true,
  textColor = 'text-light-primary dark:text-dark-primary',
  iconColor = 'fill-light-primary dark:fill-dark-primary',
}) => {
  const [copyNotification, setCopyNotification] = useState(false);
  const onShare = async () => {
    const slug = decodeURIComponent(clipboardContent);
    await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
    setCopyNotification(true);
  };

  useEffect(() => {
    const shareArticle = async () => {
      await updateArticleShare(id);
    };
    if (copyNotification) {
      shareArticle().then((data) => console.log(data));
    }
  }, [copyNotification, id]);

  return (
    <>
      {shareText ? (
        <button
          onClick={onShare}
          className={`${buttonStyle} flex rounded-full gap-2 py-[5px] pr-4 pl-3 justify-between items-center`}
        >
          <p className={`${textColor}`}>مشاركة</p>
          <RiReplyLine size="20" className={`${iconColor}`} />
        </button>
      ) : (
        <Hug onClick={onShare}>
          <RiReplyLine
            size="20"
            className="fill-light-primary dark:fill-dark-primary"
          />
        </Hug>
      )}

      <Notification
        onClose={() => setCopyNotification(false)}
        isShow={copyNotification}
        type="copy"
        text="تم نسخ الرابط بنجاح!."
      />
    </>
  );
};

export default ShareButton;
