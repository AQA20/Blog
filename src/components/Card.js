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
  isSmall = false,
  isXSmall = false,
  timeAgo = null,
  imageId = null,
  largeTitle = false,
  image = null,
  footer = true,
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
        className={clsx('my-1 max-w-2xl', {
          'flex ijustify-between gap-4 sm:gap-6': imageUrl,
        })}
      >
        <section>
          <time>
            <p>{timeAgo ? timeAgo : 'منذ شهرين'}</p>
          </time>
          <header>
            <h2
              className={clsx('mb-1 max-2-lines', {
                'text-lg': isSmall || isXSmall,
              })}
            >
              {title}
            </h2>
          </header>
          <section
            className={clsx('long-text', {
              'max-w-lg': !largeTitle,
              'max-2-lines': isSmall,
              'max-1-line ': isXSmall,
            })}
          >
            <p>{description}</p>
          </section>
        </section>

        {imageUrl && (
          <figure
            className={clsx('flex mt-2 min-w-[120px] h-[80px]', {
              'sm:min-w-[108px] sm:min-h-[72px]': isXSmall,
              'sm:min-w-[120px] sm:min-h-[80px]': isSmall,
              'sm:min-w-[180px] sm:min-h-[120px]': !isSmall && !isXSmall,
            })}
          >
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
      {footer && <CardFooter tags={tags} shareText={!isSmall} />}
    </section>
  );
};

export default Card;
