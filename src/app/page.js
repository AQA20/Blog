import Hero from '@/components/Hero';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { api } from '@/lib';
import { timeAgo } from '@/lib';

export const metadata = {
  title: 'Blog',
  description: 'AI blog posts',
};

export default async function Home() {
  try {
    const {
      data: { data },
    } = await api.get('/articles');

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
              />
            );
          })}
        </section>
      </article>
    );
  } catch (error) {
    console.error(error);
  }
}
