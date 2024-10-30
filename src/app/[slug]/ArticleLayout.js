import dynamic from 'next/dynamic';
const SwapIt = dynamic(() => import('@/components/SwapIt'));
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import ShareButton from '@/components/ShareButton';
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
        tags={article.Tags}
        imgUrl={article.featuredImg}
        timeAgo={timeAgo(article.createdAt)}
        isSmall={true}
        footer={true}
      />
    );
  };

  return (
    <>
      {/* Article content */}
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
            clipboardContent={article.slug}
            id={article.id}
          />
        </footer>
      </section>
      <section className="my-4">
        <div className="read-more text-lg">اقرأ أيضا</div>
        <section className="sm:hidden -ml-[.75rem] ">
          <SwapIt slidesPerView={3.8} spaceBetween={10} childStyle="!w-fit">
            {tags.map((tag) => (
              <Badge
                className="w-full"
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
      </section>

      <section className="hidden sm:flex mt-4 items-center gap-6">
        <section className="w-[50%]">
          {articles?.slice(0, 3).map((article) => card(article))}
        </section>
        <section className="w-[50%]">
          {articles?.slice(3).map((article) => card(article))}
        </section>
      </section>
      <section className="sm:hidden mt-4 items-center">
        <SwapIt slidesPerView={1.3} spaceBetween="40">
          <section className="w-full">
            {articles?.slice(0, 3).map((article) => card(article))}
          </section>
          <section className="w-full">
            {articles?.slice(3).map((article) => card(article))}
          </section>
        </SwapIt>
      </section>
    </>
  );
}
