'use client';

import Hug from './Hug';
import Link from 'next/link';
import { useMemo } from 'react';
import ArrowLeftSLine from './iconComponents/ArrowLeftSLine';
import ArrowRightSLine from './iconComponents/ArrowRightSLine';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const Paginate = ({ pages }) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Memoize the page query value.
  const pageQuery = useMemo(
    () => parseInt(searchParams.get('page')?.toString() || '1'),
    [searchParams],
  );

  // Memoize the URLSearchParams instance creation.
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handlePageClick = (page) => {
    params.set('page', page);
    return `${path}?${params.toString()}`;
  };
  const handleArrowClick = (next = true) => {
    let page;
    if (next) {
      page = pageQuery + 1;
    } else {
      page = pageQuery - 1;
    }
    params.set('page', page);
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <nav className="h-[56px] flex justify-between items-center">
      <ul className="flex">
        {Array.from({ length: pages })
          .slice(0, 6)
          .map((_, i) => (
            <li key={i}>
              <Link href={handlePageClick(i + 1)}>
                <Hug
                  style={`${pageQuery === i + 1 ? 'rounded-full bg-primary text-onPrimary' : ''}`}
                >
                  {i + 1}
                </Hug>
              </Link>
            </li>
          ))}
        {pages > 5 && (
          <li>
            <Link>
              <Hug>...</Hug>
            </Link>
          </li>
        )}
      </ul>
      <div className="flex justify-center items-center gap-2">
        <Hug
          onClick={() => handleArrowClick(false)}
          style="rounded-full"
          disabled={pageQuery === 1}
        >
          <ArrowRightSLine size={24} />
        </Hug>
        <Hug
          onClick={handleArrowClick}
          style="rounded-full"
          disabled={pageQuery === pages}
        >
          <ArrowLeftSLine size={24} />
        </Hug>
      </div>
    </nav>
  );
};

export default Paginate;
