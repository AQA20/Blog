import Badge from '@/components/Badge';
import Card from '@/components/Card';
import ShareButton from '@/components/ShareButton';
import SwapIt from '@/components/SwapIt';
import { fetchTags, fetchArticles } from '@/lib';
import timeAgo from '@/lib/timeAgo';
import '../styles/article.css';

export default async function ArticleLayout({ article, children }) {
  const { tags } = await fetchTags();
  const { articles } = await fetchArticles({
    limit: 6,
    orderBy: 'views',
    order: 'DESC',
  });

  const card = (article) => {
    return (
      <Card
        key={article.id}
        title={article.title}
        slug={article.slug}
        id={article.id}
        description={article.description}
        tags={article.tags}
        imgUrl={article.featuredImg}
        timeAgo={timeAgo(article.createdAt)}
        isSmall={true}
        footer={true}
      />
    );
  };

  return (
    <>
      <section>{children}</section>
      <section
        className="rounded-xl bg-light-surfaceContainerHigh 
                  dark:bg-dark-surfaceContainerHigh
                  outline-2 outline-light-outlineVariant 
                  dark:border-dark-outlineVariant 
                  dark:outline-light-outlineVariant 
                  px-6 py-4 my-4"
      >
        <header>
          <h1>هل أعجبك المقال؟</h1>
        </header>
        <section>
          <p className="dark:text-dark-onSurface">
            اذا اعجبك المقال قم بمشاركته مع اصدقائك
          </p>
        </section>
        <footer className="my-4">
          <ShareButton
            buttonStyle="bg-light-primary dark:bg-dark-primary dark:text-dark-onPrimary"
            textColor="text-light-onPrimary dark:text-dark-onPrimary"
            iconColor="fill-light-onPrimary dark:fill-dark-onPrimary"
            clipboardContent={article?.slug}
          />
        </footer>
      </section>
      <div className="my-4">
        <h3 className="text-lg">اقرأ أيضا</h3>
        <section className="sm:hidden -ml-[.75rem]">
          <SwapIt slidesPerView={3.8}>
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                title={tag.name}
                link={`/tags/${tag.name}?search=${tag.name}`}
              />
            ))}
          </SwapIt>
        </section>
        <section className="hidden sm:flex w-full">
          <div>
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                title={tag.name}
                link={`/tags/${tag.name}?search=${tag.name}`}
              />
            ))}
          </div>
        </section>
      </div>

      <section className="hidden sm:flex mt-4 items-center gap-6">
        <section>
          {articles.slice(0, 3).map((article) => card(article))}
        </section>
        <section>{articles.slice(3).map((article) => card(article))}</section>
      </section>
      <section className="sm:hidden mt-4 items-center p-0">
        <SwapIt slidesPerView={1}>
          <section className="ml-3">
            {articles.slice(0, 3).map((article) => card(article))}
          </section>
          <section>{articles.slice(3).map((article) => card(article))}</section>
        </SwapIt>
      </section>
    </>
  );
}
