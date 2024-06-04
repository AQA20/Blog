import Card from '@/components/Card';
import { fetchArticles, timeAgo } from '@/lib';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadges';

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

  return (
    <article className="my-4">
      <FilterBadges params={searchParams} />
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
