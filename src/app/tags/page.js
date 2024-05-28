import Tag from '@/components/Tag';
import { fetchTags } from '@/lib';

export default async function Page({ params, searchParams }) {
  const { tags } = await fetchTags(params.tag, {
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
    page: searchParams?.page,
  });
  return (
    <div className="mx-auto grid grid-cols-2 sm:grid-cols-4  gap-2">
      {tags.map((tag) => (
        <Tag key={tag.name} name={tag.name} />
      ))}
    </div>
  );
}
