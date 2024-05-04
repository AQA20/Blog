'use client';

import clsx from 'clsx';
import { Suspense } from 'react';
import RoundedImage from './RoundedImage';
import CardFooter from './CardFooter';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Card = ({
  imgUrl,
  title,
  description,
  tags,
  slug,
  isSmall = false,
  isXSmall = false,
  timeAgo = null,
  largeTitle = false,
  footer = true,
}) => {
  const router = useRouter();

  return (
    <section className="group">
      <article
        className={clsx('my-1 max-w-2xl cursor-pointer', {
          'flex justify-between gap-4 sm:gap-6': imgUrl,
        })}
      >
        <section>
          <time>
            <p>{timeAgo ? timeAgo : 'منذ شهرين'}</p>
          </time>

          <header>
            <h2
              className={clsx('mb-1 max-2-line', {
                'text-lg': isSmall || isXSmall,
              })}
            >
              <Link
                className="group-hover:text-light-primary"
                href={`/${slug}`}
              >
                {title}
              </Link>
            </h2>
          </header>
          <section
            className={clsx('long-text', {
              'max-w-lg': !largeTitle,
              'max-2-lines': isSmall,
              'max-1-line ': isXSmall,
            })}
          >
            <p>
              <Link href={`/${slug}`}>{description}</Link>
            </p>
          </section>
        </section>

        <figure
          className={clsx('flex mt-2 min-w-[120px] h-[80px]', {
            'sm:min-w-[108px] sm:min-h-[72px]': isXSmall,
            'sm:min-w-[120px] sm:min-h-[80px]': isSmall,
            'sm:min-w-[180px] sm:min-h-[120px]': !isSmall && !isXSmall,
          })}
        >
          <Suspense fallback={<p>Loading image...</p>}>
            <RoundedImage
              onClick={() => router.push(`/${slug}`)}
              src={imgUrl}
              width="180"
              height="120"
              alt={title}
            />
          </Suspense>
        </figure>
      </article>
      <div className="w-full">
        {footer && (
          <CardFooter
            clipboardContent={`${slug}`}
            tags={tags}
            shareText={!isSmall}
          />
        )}
      </div>
    </section>
  );
};

export default Card;
