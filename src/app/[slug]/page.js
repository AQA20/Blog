import RoundedImage from '@/components/RoundedImage';
import Tag from '@/components/Tag';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import ShareButton from '@/components/ShareButton';
import ArticleLayout from './ArticleLayout';
import { fetchArticle } from '@/lib';
import { cookies } from 'next/headers';
import moment from 'moment';

const existingCookies = () => {
  return (
    cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ') || ''
  );
};

export async function generateMetadata({ params }) {
  // Even though we're calling fetchArticle twice once here and once
  // In the page component the request will be sent once, as we're
  // using react cache
  const article = await fetchArticle(params.slug, existingCookies());
  !article && notFound();

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      // Open Graph (OG) tags
      title: article.title,
      description: article.description,
      url: `https://500kalima.com/${article.slug}`,
      siteName: '500kalima',
      images: [
        {
          url: article.featuredImg, // Must be an absolute URL
          width: 680,
          height: 510,
        },
      ],
      locale: 'ar_AR',
      type: 'website',
    },
    // Other metadata
    canonicalUrl: `https://500kalima.com/${article.slug}`,
    author: article.author.name,
    publicationDate: moment(article.createdAt).format(
      'MMMM Do YYYY, h:mm:ss a',
    ),
    keywords: article.Tags.map((tag) => tag.name).join(', '),
    language: 'ar',
  };
}

export default async function Page({ params }) {
  const article = await fetchArticle(params.slug, existingCookies());
  !article && notFound();

  const cleanHtml = DOMPurify.sanitize(article.content, {
    FORBID_TAGS: ['h1'], // Remove h1 tags
    KEEP_CONTENT: false, // Remove tags content when they're removed
  });

  return (
    <ArticleLayout article={article}>
      <article>
        <section className="truncate my-2">
          {article.Tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} />
          ))}
        </section>
        <header>
          <h1 className="mb-2">{article.title}</h1>
        </header>
        <figure>
          <RoundedImage
            onClick={null}
            src={article.featuredImg}
            alt={article.title}
            width={680}
            height={510}
          />
        </figure>
        <section className="mt-4 mb-2">
          <ShareButton
            buttonStyle="bg-light-primary dark:bg-dark-primary dark:text-dark-onPrimary"
            textColor="text-light-onPrimary dark:text-dark-onPrimary"
            iconColor="fill-light-onPrimary dark:fill-dark-onPrimary"
            id={article.id}
            clipboardContent={article.slug}
          />
        </section>
        <section
          id="articleContent"
          dangerouslySetInnerHTML={{ __html: cleanHtml }}
        ></section>
      </article>
    </ArticleLayout>
  );
}
