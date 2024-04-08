import clsx from 'clsx';
import RoundedImage from './RoundedImage';
import CardFooter from './CardFooter';

const Card = ({
  title,
  description,
  largeTitle = false,
  image = null,
  footer = false,
}) => {
  return (
    <section>
      <article
        className={clsx('max-w-2xl', {
          'flex justify-between items-center gap-2': image,
        })}
      >
        <section className="max-w-[240px] md:max-w-2xl">
          <time>
            <p>منذ شهرين</p>
          </time>

          <header>
            <h2>{title}</h2>
          </header>
          <section className={clsx('long-text', { 'max-w-lg': !largeTitle })}>
            <p>{description}</p>
          </section>
        </section>
        {image && (
          <figure>
            <RoundedImage src={image} width="120" height="120" />
          </figure>
        )}
      </article>
      {footer && <CardFooter />}
    </section>
  );
};

export default Card;
