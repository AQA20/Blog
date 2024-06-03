import Card from '@/components/Card';
import { fetchTagArticles, timeAgo } from '@/lib';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadge';

export default async function Page({ searchParams, params }) {
  const tag = params?.tag.replace(/-/g, ' ').replace('#', '').trim();
  const { articles, totalPages } = await fetchTagArticles(tag, {
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
    page: searchParams?.page,
    search: searchParams?.search,
  });
  return (
    <div>
      {/* <p className="my-4">تم العثور على 250 نتيجة</p> */}
      <div className="my-2">
        <FilterBadges params={searchParams} />
      </div>
      {articles.map((article) => (
        <Card
          key={article.id}
          id={article.id}
          slug={article.slug}
          title={article.title}
          description={article.description}
          imgUrl={article.featuredImg}
          tags={[{ name: article.tagName, id: article.tagId }]}
          timeAgo={timeAgo(article.createdAt)}
        />
      ))}
      <Paginate pages={totalPages} />
    </div>
  );
}
