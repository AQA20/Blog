import RoundedImage from '@/components/RoundedImage';
import Tag from '@/components/Tag';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import ShareButton from '@/components/ShareButton';
import ArticleLayout from './ArticleLayout';
import { fetchArticle } from '@/lib';
import { cookies } from 'next/headers';
import moment from 'moment';
import Head from 'next/head';

export default async function Page({ params }) {
  const existingCookies =
    cookies()
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ') || '';

  const article = await fetchArticle(params.slug, existingCookies);
  !article && notFound();

  // Generate metadata dynamically based on fetched article data
  const metadata = {
    title: article.title,
    description: article.description,
    // Open Graph (OG) tags
    ogTitle: article.title,
    ogDescription: article.description,
    ogImage: article.featuredImg,
    ogUrl: `https://500kalima.com/${article.slug}`,
    // Other metadata
    canonicalUrl: `https://500kalima.com/${article.slug}`,
    author: article.author.name,
    publicationDate: moment(article.createdAt).format(
      'MMMM Do YYYY, h:mm:ss a',
    ),
    keywords: article.Tags.map((tag) => tag.name).join(', '),
    language: 'ar',
  };

  const cleanHtml = DOMPurify.sanitize(article.content, {
    FORBID_TAGS: ['h1'], // Remove h1 tags
    KEEP_CONTENT: false, // Remove tags content when they're removed
  });

  return (
    <ArticleLayout article={article}>
      <Head>
        {/* Metadata */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        {/* Open Graph (OG) tags */}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        {/* Other metadata */}
        <link rel="canonical" href={metadata.canonicalUrl} />
        <meta name="author" content={metadata.author} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="language" content={metadata.language} />
      </Head>
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
