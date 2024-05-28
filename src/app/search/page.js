import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { fetchArticles, timeAgo } from '@/lib';
import filter from '@/lib/filter';
import Paginate from '@/components/Paginate';

export const metadata = {
  title: 'Blog',
  description: 'AI blog posts',
};

export default async function Home({ searchParams }) {
  const { articles, totalPages } = await fetchArticles({
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
    page: searchParams?.page,
    search: searchParams?.search,
  });

  const params = new URLSearchParams(searchParams);
  return (
    <article className="my-4">
      <Badge title="الأحدث" link={`?${filter('createdAt', 'DESC', params)}`} />
      <Badge title="الأشهر" link={`?${filter('views', 'DESC', params)}`} />
      <Badge title="الأقدم" link={`?${filter('createdAt', 'ASC', params)}`} />
      <Badge
        title="الأكثر مشاركة"
        link={`?${filter('shares', 'DESC', params)}`}
      />
      <div className="my-6"></div>

      <section id="#articles">
        {articles.map((article) => {
          return (
            <Card
              key={article.id}
              id={article.id}
              title={article.title}
              slug={article.slug}
              tags={article.Tags}
              description={article.description}
              imgUrl={article.featuredImg}
              timeAgo={timeAgo(article.createdAt)}
            />
          );
        })}
      </section>
      <Paginate pages={totalPages} />
    </article>
  );
}
