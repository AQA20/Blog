'use client';

import Badge from './Badge';
import filter from '@/lib/filter';

const FilterBadges = ({ searchParams }) => {
  const params = new URLSearchParams(searchParams);
  return (
    <div className="flex flex-wrap">
      <Badge title="الأحدث" link={`?${filter('createdAt', 'DESC', params)}`} />
      <Badge title="الأشهر" link={`?${filter('views', 'DESC', params)}`} />
      <Badge title="الأقدم" link={`?${filter('createdAt', 'ASC', params)}`} />
      <Badge
        title="الأكثر مشاركة"
        link={`?${filter('shares', 'DESC', params)}`}
      />
    </div>
  );
};

export default FilterBadges;
