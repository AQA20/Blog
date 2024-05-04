import Hero from '@/components/Hero';
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import { fetchArticles, timeAgo } from '@/lib';

export const metadata = {
  title: 'Blog',
  description: 'AI blog posts',
};

export default async function Home() {
  const articles = await fetchArticles();

  return (
    <article className="my-4">
      <Hero article={articles[0]} />
      <Badge title="الأحدث" />
      <Badge title="الأشهر" />
      <Badge title="الأقدم" />
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
    </article>
  );
}
