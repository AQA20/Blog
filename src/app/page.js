import { Suspense, lazy } from 'react';
import { fetchArticles, timeAgo } from '@/lib';
const Hero = lazy(() => import('@/components/Hero'));
const Card = lazy(() => import('@/components/Card'));
const Paginate = lazy(() => import('@/components/Paginate'));
const FilterBadges = lazy(() => import('@/components/FilterBadges'));

// Generate static params for pagination
export async function generateStaticParams() {
  try {
    console.log('ran');
    // Fetch articles to get the total number of pages
    const data = await fetchArticles({
      orderBy: 'createdAt',
      order: 'DESC',
      page: 1,
    });

    console.log('data');

    const params = [];
    console.log('params');
    for (let page = 1; page <= data.totalPages; page++) {
      params.push({ page: page.toString() }); // Generate static params for pages
    }
    console.log('pages', data.totalPages);

    return params;
  } catch (error) {
    console.error('Error generating static params:', error);
  }
}

// Fetch the home page articles
async function getHomePageArticles({
  orderBy = 'createdAt',
  order = 'DESC',
  page = 1,
  search = '',
}) {
  const data = await fetchArticles({
    orderBy,
    order,
    page,
    search,
  });
  return data;
}

// Todo implement unit & integration tests

// Main component for the homepage
export default async function Home({ searchParams }) {
  const data = await getHomePageArticles(searchParams);
  return (
    <Suspense fallback="...loading articles">
      <article className="my-4">
        {!searchParams?.page && !searchParams?.orderBy && (
          <Hero article={data.articles[0]} />
        )}
        <FilterBadges urlSearchParams={searchParams} />
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
