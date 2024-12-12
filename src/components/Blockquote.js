'use client';

import DoubleQuotes from './iconComponents/DoubleQuotes';

export const Blockquote = ({ quote, quoteBy, className }) => {
  return (
    <blockquote className={`my-2 relative w-full p-6' ${className}`}>
      <div className="absolute bottom-0 right-0 top-0 w-[2px] bg-primary" />
      <div className="flex space-x-3 mr-4">
        <div className="pl-2">
          <DoubleQuotes />
        </div>

        <p className="flex-1" data-quote-content={quote}>
          {quote}
        </p>
      </div>
      {quoteBy && (
        <p className="pt-4 mr-4">
          <strong data-quote-by={quoteBy}>{quoteBy}</strong>
        </p>
      )}
    </blockquote>
  );
};
