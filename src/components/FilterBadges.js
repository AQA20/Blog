import Badge from './Badge';
import filter from '@/lib/filter';

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
    <div className="flex flex-wrap">
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
  );
};

export default FilterBadges;
