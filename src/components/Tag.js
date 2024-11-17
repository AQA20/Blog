'use client';

import Link from 'next/link';

const Tag = ({ name }) => {
  const tagName = name?.replace(/\s/g, '-');
  const encodedTagName = encodeURIComponent(tagName);
  return (
    <span className="ml-4">
      <Link
        className="hover:cursor-pointer text-primary"
        href={`/tags/${encodedTagName}?search=${encodedTagName}`}
      >
        #{name}
      </Link>
    </span>
  );
};

export default Tag;
