import Hero from '@/components/Hero';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import api from '@/lib/api';
import { parseISO, formatDistanceToNow } from 'date-fns';
import arLocale from 'date-fns/locale/ar';

export const metadata = {
  title: 'Blog',
  description: 'AI blog posts',
};

export default async function Home() {
  const {
    data: { data },
  } = await api.get('/api/articles');

  const timeAgo = (timestamp) => {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date, { locale: arLocale });
    return `منذ ${timePeriod}`;
  };

  return (
    <article className="my-4">
      <Hero article={data[0]} />
      <Badge title="الأحدث" />
      <Badge title="الأشهر" />
      <Badge title="الأقدم" />
      <div className="my-6"></div>

      <section id="#articles">
        {data.map((article) => {
          return (
            <Card
              key={article.id}
              title={article.title}
              tags={article.tags}
              description={article.description}
              imageId={article.thumbnail_id}
              timeAgo={timeAgo(article.created_at)}
              footer={true}
            />
          );
        })}
      </section>
    </article>
  );
}
