'use client';

import clsx from 'clsx';
import { useEffect, useState, Suspense } from 'react';
import RoundedImage from './RoundedImage';
import CardFooter from './CardFooter';
import { fetchImage } from '@/lib/api';

const Card = ({
  title,
  description,
  tags,
  timeAgo = null,
  imageId = null,
  largeTitle = false,
  image = null,
  footer = false,
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (imageId) {
      fetchImage(imageId)
        .then((url) => setImageUrl(url))
        .catch((error) => console.error(error));
    } else if (image) {
      setImageUrl(image);
    }

    // Cleanup function to revoke the URL
    return () => URL.revokeObjectURL(imageUrl);
  }, []);

  return (
    <section>
      <time>
        <p>{timeAgo ? timeAgo : 'منذ شهرين'}</p>
      </time>
      <article
        className={clsx('my-1 max-w-2xl', {
          'flex justify-between gap-6': imageUrl,
        })}
      >
        <section className="max-w-[240px] md:max-w-2xl">
          <header className="mb-1">
            <h2>{title}</h2>
          </header>
          <section className={clsx('long-text', { 'max-w-lg': !largeTitle })}>
            <p>{description}</p>
          </section>
        </section>

        {imageUrl && (
          <figure className="flex min-w-[180px] min-h-[120px] w-[180px] h-[120px]">
            <Suspense fallback={<p>Loading image...</p>}>
              <RoundedImage
                src={imageUrl}
                width="180"
                height="120"
                alt={title}
              />
            </Suspense>
          </figure>
        )}
      </article>
      {footer && <CardFooter tags={tags} />}
    </section>
  );
};

export default Card;
