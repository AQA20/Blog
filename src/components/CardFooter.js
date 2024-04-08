import Tag from './Tag';
import Hug from './Hug';
import { RiShareForwardLine } from '@remixicon/react';

const CardFooter = ({ shareText = true }) => {
  return (
    <section className="min-w-full">
      <footer className="h-14 flex items-center justify-between">
        <div className="truncate flex">
          <div className="truncate">
            <Tag name="المستكشف" />
            <Tag name="الباني البارع" />
            <Tag name="السعادة البشرية" />
            <Tag name="السعادة البشرية" />
          </div>
        </div>
        <div className="flex items-center">
          {shareText && (
            <p className="hidden md:block text-light-primary align-start">
              مشاركة
            </p>
          )}
          <Hug>
            <RiShareForwardLine
              size="20"
              className="fill-light-primary  scale-x-[-1]"
            />
          </Hug>
        </div>
      </footer>
      <hr className="mt-2 mb-6" />
    </section>
  );
};

export default CardFooter;
