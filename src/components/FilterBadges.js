import Badge from './Badge';
import filter from '@/lib/filter';
import SwapIt from '@/components/SwapIt';

const FilterBadge = ({ title, link }) => {
  return (
    <a href={link} className="inline-block focus:outline-none">
      <Badge title={title} link={link} />
    </a>
  );
};

const FilterBadges = ({ urlSearchParams }) => {
  const params = new URLSearchParams(urlSearchParams);
  return (
    <>
      <div className="hidden md:flex flex-wrap gap-2">
        <FilterBadge
          title="الأحدث"
          link={`?${filter('createdAt', 'DESC', params)}`}
          className="pr-0"
        />
        <FilterBadge
          title="الأشهر"
          link={`?${filter('views', 'DESC', params)}`}
        />
        <FilterBadge
          title="الأقدم"
          link={`?${filter('createdAt', 'ASC', params)}`}
        />
        <FilterBadge
          title="الأكثر مشاركة"
          link={`?${filter('shares', 'DESC', params)}`}
        />
      </div>
      <div className="md:hidden  gap-2">
        <SwapIt slidesPerView={1.5}>
          <FilterBadge
            title="الأحدث"
            link={`?${filter('createdAt', 'DESC', params)}`}
            className="pr-0"
          />
          <FilterBadge
            title="الأشهر"
            link={`?${filter('views', 'DESC', params)}`}
          />
          <FilterBadge
            title="الأقدم"
            link={`?${filter('createdAt', 'ASC', params)}`}
          />
          <FilterBadge
            title="الأكثر مشاركة"
            link={`?${filter('shares', 'DESC', params)}`}
          />
        </SwapIt>
      </div>
    </>
  );
};

export default FilterBadges;
