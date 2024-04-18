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
      <article
        className={clsx('max-w-2xl', {
          'flex justify-between items-center gap-2': imageUrl,
        })}
      >
        <section className="max-w-[240px] md:max-w-2xl">
          <time>
            <p>{timeAgo ? timeAgo : 'منذ شهرين'}</p>
          </time>

          <header>
            <h2>{title}</h2>
          </header>
          <section className={clsx('long-text', { 'max-w-lg': !largeTitle })}>
            <p>{description}</p>
          </section>
        </section>

        {imageUrl && (
          <figure>
            <Suspense fallback={<p>Loading image...</p>}>
              <RoundedImage
                src={imageUrl}
                width="120"
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
