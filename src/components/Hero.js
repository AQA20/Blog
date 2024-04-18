'use client';

import Image from 'next/image';
import Button from './Button';
import { RiArrowDownLine } from '@remixicon/react';
import { useEffect, useState, Suspense, useRef } from 'react';
import { fetchImage } from '@/lib/api';

const Hero = ({ article }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const componentRef = useRef(null);
  useEffect(() => {
    fetchImage(article.thumbnail_id)
      .then((url) => setImageUrl(url))
      .catch((error) => setImageUrl(null));
  }, []);

  return (
    <article>
      {imageUrl && (
        <Suspense fallback={<p>...loading</p>}>
          <Image
            className="my-2 rounded-lg "
            src={imageUrl}
            width="680"
            height="510"
            alt={article.title}
          />
        </Suspense>
      )}

      <header>
        <h1 className="hover:cursor-pointer">{article.title}</h1>
      </header>
      <section>
        <p className="long-text mb-2 text-headline">{article.description}</p>
      </section>
      <div ref={componentRef}></div>
      <footer className="mb-4">
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
