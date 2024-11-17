'use client';

import ReplyLine from './iconComponents/ReplyLine';
import Hug from './Hug';
import { updateArticleShare } from '@/lib';
import { useNotification } from '@/providers/NotificationProvider';

const ShareButton = ({
  clipboardContent,
  buttonStyle,
  id,
  shareText = true,
  textColor = 'text-primary',
  iconColor = 'fill-primary',
}) => {
  const showNotification = useNotification();

  const onShare = async () => {
    const slug = decodeURIComponent(clipboardContent);
    try {
      // While updateArticleShare returns a promise,  we Fire-and-forget:
      // updateArticleShare(id) runs in the background for better performance as
      // no response is needed
      updateArticleShare(id);
      await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
      showNotification('تم نسخ الرابط بنجاح!.', 'copy');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {shareText ? (
        <button
          onClick={onShare}
          className={`${buttonStyle} flex rounded-full gap-2 py-[5px] pr-4 pl-3 justify-between items-center`}
        >
          <p className={`${textColor}`}>مشاركة</p>
          <ReplyLine size="20" className={`${iconColor}`} />
        </button>
      ) : (
        <Hug onClick={onShare}>
          <ReplyLine size="20" className="fill-primary" />
          {''}
        </Hug>
      )}
    </>
  );
};

export default ShareButton;
