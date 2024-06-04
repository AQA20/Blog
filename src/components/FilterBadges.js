'use client';

import Badge from './Badge';
import filter from '@/lib/filter';
import SwapIt from './SwapIt';

const FilterBadges = ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);
  return (
    <>
      <span className="hidden sm:block">
        <Badge
          title="الأحدث"
          link={`?${filter('createdAt', 'DESC', params)}`}
        />
        <Badge title="الأشهر" link={`?${filter('views', 'DESC', params)}`} />
        <Badge title="الأقدم" link={`?${filter('createdAt', 'ASC', params)}`} />
        <Badge
          title="الأكثر مشاركة"
          link={`?${filter('shares', 'DESC', params)}`}
        />
      </span>
      <section className="sm:hidden -ml-[.75rem]">
        <SwapIt>
          <Badge
            title="الأحدث"
            link={`?${filter('createdAt', 'DESC', params)}`}
          />
          <Badge title="الأشهر" link={`?${filter('views', 'DESC', params)}`} />
          <Badge
            title="الأقدم"
            link={`?${filter('createdAt', 'ASC', params)}`}
          />
          <Badge
            title="الأكثر مشاركة"
            link={`?${filter('shares', 'DESC', params)}`}
          />
        </SwapIt>
      </section>
    </>
  );
};

export default FilterBadges;
