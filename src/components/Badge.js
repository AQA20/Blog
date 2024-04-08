import Link from 'next/link';

const Badge = ({ title }) => {
  return (
    <button className="whitespace-nowrap border-2 my-2 border-outline h-8 px-4 rounded-lg ml-2">
      <Link className="text-sm" href={`#${title}`}>
        {title}
      </Link>
    </button>
  );
};

export default Badge;
