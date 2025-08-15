import { Suspense, lazy } from 'react';
import { fetchArticles, timeAgo } from '@/lib';
const Hero = lazy(() => import('@/components/Hero'));
const Card = lazy(() => import('@/components/Card'));
const Paginate = lazy(() => import('@/components/Paginate'));
const FilterBadges = lazy(() => import('@/components/FilterBadges'));

// Todo implement unit & integration tests

export default async function Home({ searchParams }) {
  const urlSearchParams = await searchParams;
  const { orderBy, order, page } = urlSearchParams;
  const data = await fetchArticles({
    orderBy,
    order,
    page,
  });

  return (
    <Suspense fallback="...loading articles">
      <article className="my-4">
        {!page && !orderBy && <Hero article={data.articles[0]} />}
        <FilterBadges urlSearchParams={urlSearchParams} />
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
                width={180}
                height={120}
                animate={false}
              />
            );
          })}
          {data.articles.length === 0 && (
            <div dir="rtl">لا يوجد مقالات حاليا!</div>
          )}
        </section>
        <Paginate pages={data.totalPages} />
      </article>
    </Suspense>
  );
}
