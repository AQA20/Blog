import RoundedImage from '@/components/RoundedImage';
import Tag from '@/components/Tag';
import Button from '@/components/Button';
import { fetchArticle } from '@/lib';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';

export default async function Page({ params }) {
  const article = await fetchArticle(params.slug);
  !article && notFound();
  const cleanHtml = DOMPurify.sanitize(article.content);

  return (
    <article>
      <header>
        <h1>{article.title}</h1>
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
      <section className="truncate my-4">
        {article.Tags.map((tag) => (
          <Tag key={tag.name} name={tag.name} />
        ))}
      </section>
      <section>
        <Button title="مشاركة" icon="/share-white.svg" />
      </section>
      <section dangerouslySetInnerHTML={{ __html: cleanHtml }}></section>
    </article>
  );
}
