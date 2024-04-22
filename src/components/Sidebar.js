import Card from './Card';
import Badge from './Badge';
import { Suspense } from 'react';
import { timeAgo } from '@/lib';

const Sidebar = ({ articles }) => {
  return (
    <article className="w-[344px] mr-12 pr-2 sticky top-0 py-2">
      <header>
        <h2 className="mb-4 mt-2">الأكثر قراءة</h2>
      </header>
      <section>
        <Suspense callback="...loading sidebar cards">
          {articles.map((article) => (
            <Card
              key={article.title}
              title={article.title}
              description={article.description}
              tags={article.tags}
              imageId={article.thumbnail_id}
              timeAgo={timeAgo(article.created_at)}
              isSmall={true}
            />
          ))}
        </Suspense>
      </section>
      <h2 className="mb-2">أشهر المواضيع</h2>
      <footer className="flex flex-wrap">
        {articles.map((article) =>
          article.tags.map((tag) => <Badge key={tag.name} title={tag.name} />)
        )}
      </footer>
    </article>
  );
};

export default Sidebar;
