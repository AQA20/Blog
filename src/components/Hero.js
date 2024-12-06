'use client';

import Image from 'next/image';
import Button from './Button';
import ArrowDownLine from './iconComponents/ArrowDownLine';
import { Suspense, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Hero = ({ article }) => {
  const componentRef = useRef(null);
  const router = useRouter();

  return (
    <article className="mt-4 mb-6">
      <Suspense fallback={<p>...loading</p>}>
        <div className="w-full h-full md:w-[680px] md:h-[510px] overflow-hidden">
          <Image
            onClick={() => router.push(`/${article.slug}`)}
            className="rounded-[8px] cursor-pointer h-full w-full object-cover"
            src={article.featuredImg}
            width="680"
            height="510"
            alt={article.title}
            priority
          />
        </div>
      </Suspense>

      <section className="my-5">
        <header>
          <h1>
            <Link className="text-headline-m" href={`/${article.slug}`}>
              {article.title}
            </Link>
          </h1>
        </header>
        <section>
          <p>
            <Link className="text-onSurfaceVariant" href={`/${article.slug}`}>
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
          <ArrowDownLine size="20px" className="fill-onPrimary" />
        </Button>
      </footer>
    </article>
  );
};

export default Hero;
