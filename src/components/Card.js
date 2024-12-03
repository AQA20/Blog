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
  animate = true,
  isSmall = false,
  timeAgo = null,
  largeTitle = false,
  footer = true,
  width = 120,
  height = 80,
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
          className={clsx('flex mt-2 translate-all duration-200', {
            'group-hover:scale-105': animate,
          })}
        >
          <Suspense fallback={<p>Loading image...</p>}>
            <RoundedImage
              onClick={() => router.push(articleUri)}
              src={imgUrl}
              width={width}
              height={height}
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
