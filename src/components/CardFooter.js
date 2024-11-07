import Tag from './Tag';
import ShareButton from './ShareButton';

const CardFooter = ({ clipboardContent, id, tags = [], shareText = true }) => {
  return (
    <section className="min-w-full">
      <footer className="h-[52px] flex items-center justify-between">
        <div className="flex truncate">
          <div className="truncate">
            {tags.map((tag) => (
              <Tag key={tag.id} name={tag.name} />
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <ShareButton
            clipboardContent={clipboardContent}
            shareText={shareText}
            id={id}
          />
        </div>
      </footer>
      <hr className="mt-2 mb-6 dark:border-dark-outlineVariant" />
    </section>
  );
};

export default CardFooter;
