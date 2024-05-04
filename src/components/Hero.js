'use client';

import Image from 'next/image';
import Button from './Button';
import { RiArrowDownLine } from '@remixicon/react';
import { Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Hero = ({ article }) => {
  const componentRef = useRef(null);
  const router = useRouter();

  return (
    <article className="mt-4 mb-6">
      <Suspense fallback={<p>...loading</p>}>
        <Image
          onClick={() => router.push(`/${article.slug}`)}
          className="rounded-lg cursor-pointer"
          src={article.featuredImg}
          width="680"
          height="510"
          alt={article.title}
        />
      </Suspense>

      <section className="my-5">
        <header>
          <h1>
            <Link
              className="hover:text-light-primary"
              href={`/${article.slug}`}
            >
              {article.title}
            </Link>
          </h1>
        </header>
        <section>
          <p>
            <Link
              className="hover:text-light-primary"
              href={`/${article.slug}`}
            >
              {article.description}
            </Link>
          </p>
        </section>
      </section>
      <div ref={componentRef}></div>
      <footer>
        <Button
          title="استكشف"
          onClick={() =>
            componentRef.current.scrollIntoView({ behavior: 'smooth' })
          }
        >
          <RiArrowDownLine size="20px" className="fill-white" />
        </Button>
      </footer>
    </article>
  );
};

export default Hero;
