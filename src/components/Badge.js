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
    <Link
      href={link}
      className={clsx(
        'inline-block align-middle border-2 my-2 border-outline dark:border-dark-outlineVariant h-10 px-4 pt-2 rounded-lg ml-2 text-sm text-nowrap dark:text-dark-onSurface',
        { 'active-filter': isActive },
      )}
    >
      {title}
    </Link>
  );
};

export default Badge;
