import Link from 'next/link';

const Tag = ({ name }) => {
  return (
    <span className="ml-4">
      <Link className=" text-light-primary" href={`/tags/${name}`}>
        #{name}
      </Link>
    </span>
  );
};

export default Tag;
