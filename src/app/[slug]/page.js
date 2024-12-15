import Image from 'next/image';
import Tag from '@/components/Tag';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import ShareButton from '@/components/ShareButton';
import ArticleLayout from './ArticleLayout';
import { fetchArticle, fetchArticleSlugs } from '@/lib';
import moment from 'moment';
import Article from '@/components/Article/Article';

// This function generates static parameters for each article
export async function generateStaticParams() {
  // Fetch all of the slugs from the API
  const data = await fetchArticleSlugs();
  // Each slug will be used to generate a static page
  return data.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const routeParams = await params;
  // Even though we're calling fetchArticle twice once here and once
  // In the page component the request will be sent once, as we're
  // using react cache
  const article = await fetchArticle(routeParams.slug);
  !article && notFound();

  const { title, description, featuredImg, author, createdAt, Tags, slug } =
    article;

  return {
    title,
    description,
    openGraph: {
      // Open Graph (OG) tags
      title,
      description,
      url: `${process.nev.NEXT_JS_URL}/${slug}`,
      siteName: '500kalima',
      images: [
        {
          url: featuredImg, // Must be an absolute URL
          width: 940,
          height: 788,
        },
      ],
      locale: 'ar_AR',
      type: 'website',
    },
    // Other metadata
    canonicalUrl: `${process.nev.NEXT_JS_URL}/${slug}`,
    author: author.name,
    publicationDate: moment(createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    keywords: Tags.map((tag) => tag.name).join(', '),
    language: 'ar',
  };
}

export default async function Page({ params }) {
  const routeParams = await params;
  const article = await fetchArticle(routeParams.slug);
  !article && notFound();

  let cleanHtml = DOMPurify.sanitize(article.content, {
    FORBID_TAGS: ['h1'], // Remove h1 tags
    ALLOWED_TAGS: [
      'h2',
      'h3',
      'p',
      'iframe',
      'link',
      'a',
      'footer',
      'ol',
      'ul',
      'li',
      'img',
      'strong',
      'cite',
      'quote',
      'div',
      'br',
      'blockquote',
    ],
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
        <figure className="block w-full h-full md:w-[680px] md:h-[510px] overflow-hidden">
          <Image
            onClick={null}
            src={article.featuredImg}
            alt={article.title}
            width={680}
            height={510}
            className="rounded-[8px] h-full w-full object-cover shrink-0 cursor-pointer"
          />
        </figure>
        <section className="mt-4 mb-2">
          <ShareButton
            buttonStyle="bg-primary text-onPrimary"
            textColor="text-onPrimary"
            iconColor="fill-light-onPrimary dark:fill-dark-onPrimary"
            id={article.id}
            clipboardContent={article.slug}
          />
        </section>
        <Article content={cleanHtml} />
      </article>
    </ArticleLayout>
  );
}
