import Card from '@/components/Card';
import { fetchArticles, timeAgo } from '@/lib';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadges';

export default async function Page({ searchParams }) {
  const urlSearchParams = await searchParams;
  const { orderBy, order, page, search } = urlSearchParams;
  const { articles, totalPages } = await fetchArticles({
    orderBy,
    order,
    page,
    search,
  });

  return (
    <article className="my-4">
      <FilterBadges urlSearchParams={searchParams} />
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
              width={180}
              height={120}
            />
          );
        })}
      </section>
      <Paginate pages={totalPages} />
    </article>
  );
}
