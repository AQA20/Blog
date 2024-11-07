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
  id,
  isSmall = false,
  isXSmall = false,
  timeAgo = null,
  largeTitle = false,
  footer = true,
}) => {
  const router = useRouter();
  const articleUri = `/${slug}`;

  return (
    <section>
      <article
        className={clsx('group my-1 w-full cursor-pointer', {
          'flex justify-between gap-4 sm:gap-6': imgUrl,
        })}
      >
        <section>
          <time>
            <p>{timeAgo ? timeAgo : 'منذ شهرين'}</p>
          </time>

          <header>
            <h1
              className={clsx('mb-1 line-clamp-2 text-title-m sm:text-title-l')}
            >
              <Link className="group-hover:underline" href={articleUri}>
                {title}
              </Link>
            </h1>
          </header>
          <section
            className={clsx('line-clamp-2', {
              'max-w-lg': !largeTitle,
            })}
          >
            <p>
              <Link href={articleUri}>{description}</Link>
            </p>
          </section>
        </section>

        <figure
          className={clsx(
            'flex mt-2 min-w-[120px] h-[80px] translate-all duration-200 group-hover:scale-105',
            {
              'sm:min-w-[108px] sm:min-h-[72px]': isXSmall,
              'sm:min-w-[120px] sm:min-h-[80px]': isSmall,
              'sm:min-w-[180px] sm:min-h-[120px]': !isSmall && !isXSmall,
            },
          )}
        >
          <Suspense fallback={<p>Loading image...</p>}>
            <RoundedImage
              onClick={() => router.push(articleUri)}
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
            clipboardContent={slug}
            id={id}
            tags={tags}
            shareText={!isSmall}
          />
        )}
      </div>
    </section>
  );
};

export default Card;
