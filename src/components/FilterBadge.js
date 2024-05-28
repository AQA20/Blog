'use client';

import Badge from './Badge';

const FilterBadge = ({ title, link }) => {
  return (
    <>
      <Badge
        title={title}
        link={link}
        isActive={link.includes('orderBy=createdAt&order=DESC') || !link}
      />
      <Badge
        title={title}
        link={link}
        isActive={link.includes('orderBy=createdAt&order=DESC') || !link}
      />
      <Badge
        title={title}
        link={link}
        isActive={link.includes('orderBy=createdAt&order=DESC') || !link}
      />
    </>
  );
};

export default FilterBadge;
