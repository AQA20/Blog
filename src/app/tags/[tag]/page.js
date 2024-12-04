import Card from '@/components/Card';
import { fetchTagArticles, timeAgo } from '@/lib';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadges';

export default async function Page({ searchParams, params }) {
  const routeParams = await params;
  const urlSearchParams = await searchParams;
  const tag = routeParams?.tag.replace(/-/g, ' ').replace('#', '').trim();
  const { articles, totalPages } = await fetchTagArticles(tag, {
    orderBy: urlSearchParams?.orderBy,
    order: urlSearchParams?.order,
    page: urlSearchParams?.page,
    search: urlSearchParams?.search,
  });
  return (
    <div>
      {/* <p className="my-4">تم العثور على 250 نتيجة</p> */}
      <div className="my-2">
        <FilterBadges urlSearchParams={urlSearchParams} />
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
          width={180}
          height={120}
          animate={false}
        />
      ))}
      <Paginate pages={totalPages} />
    </div>
  );
}
