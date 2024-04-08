import Image from 'next/image';
import CardFooter from './CardFooter';

const SidebarCard = ({ title, description, image }) => {
  return (
    <section>
      <article className="flex justify-between items-center gap-2">
        <section>
          <time>
            <p>منذ شهرين</p>
          </time>
          <header>
            <h3 className="max-2-lines">{title}</h3>
          </header>
          <section className="max-2-lines">{description}</section>
        </section>
        <figure>
          <Image
            className="rounded-lg"
            src={image}
            width="120"
            height="120"
            alt="article-image"
          />
        </figure>
      </article>
      <CardFooter shareText={false} />
    </section>
  );
};

export default SidebarCard;
