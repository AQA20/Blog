'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { useMemo } from 'react';

const Badge = ({ title, link }) => {
  const searchParams = useSearchParams();

  // Convert searchParams to a string for stable dependency
  const searchParamsString = searchParams.toString();

  // Memoize the URLSearchParams object
  const params = useMemo(
    () => new URLSearchParams(searchParamsString),
    [searchParamsString],
  );

  // Memoize the active filter condition
  const isActive = useMemo(
    () => params.toString() === link.replace('?', ''),
    [params, link],
  );

  return (
    <Link className="text-sm text-nowrap dark:text-dark-onSurface" href={link}>
      <button
        className={clsx(
          'border-2 my-2 border-outline dark:border-dark-outlineVariant h-8 px-4 rounded-lg ml-2',
          { 'active-filter': isActive },
        )}
      >
        {title}
      </button>
    </Link>
  );
};

export default Badge;
