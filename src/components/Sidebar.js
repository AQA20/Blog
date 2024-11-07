import Card from './Card';
import Badge from './Badge';
import { Suspense } from 'react';
import { timeAgo } from '@/lib';
import { fetchArticles } from '@/lib';

const Sidebar = async () => {
  const { articles } = await fetchArticles({
    orderBy: 'views',
    order: 'DESC',
    limit: 3,
  });
  return (
    <article className="w-[344px] mr-12 pr-2 sticky top-0 py-2">
      <header>
        <h2 className="mb-4 mt-2 text-title-l">الأكثر قراءة</h2>
      </header>
      <section>
        <Suspense fallback="...loading sidebar cards">
          {articles.map((article) => (
            <Card
              key={article.title}
              title={article.title}
              id={article.id}
              slug={article.slug}
              description={article.description}
              tags={article.Tags}
              imgUrl={article.featuredImg}
              timeAgo={timeAgo(article.createdAt)}
              isSmall={true}
            />
          ))}
        </Suspense>
      </section>
      <h2 className="mb-2 text-title-l">أشهر المواضيع</h2>
      <footer className="flex flex-wrap">
        {articles.map((article) =>
          article.Tags.map((tag) => (
            <Badge
              key={tag.name}
              title={tag.name}
              link={`/tags/${tag.name}?search=${tag.name}`}
            />
          )),
        )}
      </footer>
    </article>
  );
};

export default Sidebar;
