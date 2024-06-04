import Hero from '@/components/Hero';
import Card from '@/components/Card';
import { fetchArticles, timeAgo } from '@/lib';
import { Suspense } from 'react';
import Paginate from '@/components/Paginate';
import FilterBadges from '@/components/FilterBadges';

// Todo implement unit & integration tests

export const metadata = {
  title: 'Blog',
  description: 'AI blog posts',
};

export default async function Home({ searchParams }) {
  const data = await fetchArticles({
    orderBy: searchParams?.orderBy,
    order: searchParams?.order,
    page: searchParams?.page,
  });

  return (
    <Suspense fallback="...loading articles">
      <article className="my-4">
        {!searchParams?.page && !searchParams?.orderBy && (
          <Hero article={data.articles[0]} />
        )}
        <FilterBadges params={searchParams} />
        <div className="my-6"></div>
        <section id="#articles">
          {data.articles.map((article) => {
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
        <Paginate pages={data.totalPages} />
      </article>
    </Suspense>
  );
}
