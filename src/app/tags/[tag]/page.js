import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { fetchTagArticles, timeAgo } from '@/lib';
import filter from '@/lib/filter';
import Paginate from '@/components/Paginate';

export default async function Page({ searchParams, params }) {
  const tag = params?.tag.replace(/-/g, ' ').replace('#', '').trim();
  const { articles, totalPages } = await fetchTagArticles(tag, {
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
    page: searchParams?.page,
    search: searchParams?.search,
  });
  const urlParams = new URLSearchParams(searchParams);
  return (
    <div>
      <p className="my-4">تم العثور على 250 نتيجة</p>
      <div className="my-2">
        <Badge
          title="الأحدث"
          link={`?${filter('createdAt', 'DESC', urlParams)}`}
        />
        <Badge title="الأشهر" link={`?${filter('views', 'DESC', urlParams)}`} />
        <Badge
          title="الأقدم"
          link={`?${filter('createdAt', 'ASC', urlParams)}`}
        />
        <Badge
          title="الأكثر مشاركة"
          link={`?${filter('shares', 'DESC', urlParams)}`}
        />
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
