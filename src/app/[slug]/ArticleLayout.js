import dynamic from 'next/dynamic';
const SwapIt = dynamic(() => import('@/components/SwapIt'));
import Badge from '@/components/Badge';
import Card from '@/components/Card';
import ShareButton from '@/components/ShareButton';
import { fetchTags, fetchRelatedArticles } from '@/lib';
import timeAgo from '@/lib/timeAgo';

export default async function ArticleLayout({ article, children }) {
  const { tags } = await fetchTags();
  const articles = await fetchRelatedArticles(
    article.id,
    article.categoryId,
    article.Tags,
  );

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
        animate={false}
        footer={true}
      />
    );
  };

  return (
    <>
      {/* Article content */}
      <section>{children}</section>
      <section
        className="rounded-xl bg-surfaceContainerHigh 
                  outline-2 outline-outlineVariant 
                  dark:border-outlineVariant 
                  dark:outline-outlineVariant 
                  px-6 py-4 my-4"
      >
        <header>
          <h3>هل أعجبك المقال؟</h3>
        </header>
        <section>
          <p>اذا اعجبك المقال قم بمشاركته مع اصدقائك</p>
        </section>
        <footer className="my-4">
          <ShareButton
            buttonStyle="bg-primary text-onPrimary"
            textColor="text-onPrimary"
            iconColor="fill-onPrimary"
            clipboardContent={article.slug}
            id={article.id}
          />
        </footer>
      </section>
      <section className="my-4">
        <div className="read-more text-headline-l text-onSurface">
          اقرأ أيضا
        </div>
        <section className="sm:hidden -ml-[.75rem] ">
          <SwapIt slidesPerView={3.2} spaceBetween={10} childStyle="!w-fit">
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

      <section className="hidden  xl:flex justify-between mt-4 gap-6 w-full overflow-x-auto">
        <section className="w-full md:w-[320px]">
          {articles?.slice(0, 3).map((article) => card(article))}
        </section>
        <section className="w-full md:w-[320px]">
          {articles?.slice(3).map((article) => card(article))}
        </section>
      </section>
      <section className="xl:hidden mt-4">
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
