'use client';

import parse from 'html-react-parser';
import { TweetComponent } from '@/components/Embeds/TweetComponent';
import { FacebookEmbed } from '@/components/Embeds/FacebookEmbed';
import { InstagramEmbed } from '../Embeds/InstagramEmbed';
import { Blockquote } from '../Blockquote';
import Image from 'next/image';
import './style.css';

const Article = ({ content }) => {
  const processedContent = parse(content, {
    replace: (domNode) => {
      // Replace <div data-tweet> with <Tweet> component
      if (domNode.name === 'div' && domNode?.attribs['data-tweet']) {
        const id = domNode.attribs['data-tweet'];

        return <TweetComponent id={id} />;
      } else if (
        // Replace <div data-post-url> with <FacebookPostEmbed> component
        domNode.name === 'div' &&
        domNode?.attribs['data-post-url']
      ) {
        const postUrl = domNode.attribs['data-post-url'];
        return <FacebookEmbed postUrl={postUrl} />;
      } else if (
        domNode.name === 'div' &&
        domNode?.attribs['data-instgrm-permalink']
      ) {
        // Replace <div data-instgrm-permalink> with <InstagramEmbed> component
        const postUrl = domNode.attribs['data-instgrm-permalink'];
        return <InstagramEmbed postUrl={postUrl} />;
      } else if (
        domNode.name === 'div' &&
        domNode?.attribs['data-quote-content']
      ) {
        // Replace <div data-quote-content> with <Blockquote> component
        const quote = domNode.attribs['data-quote-content'];
        const quoteBy = domNode.attribs['data-quote-by'];
        return <Blockquote quote={quote} quoteBy={quoteBy} />;
      } else if (domNode.name === 'img') {
        // Replace img with next Image component
        const alt = domNode.attribs['alt'];
        const src = domNode.attribs['src'];
        return (
          <figure className="my-4">
            <Image alt={alt} src={src} width={680} height={510} />
            <figcaption className="mt-[-12px] text-primary">{alt}</figcaption>
          </figure>
        );
      }

      return null; // Default to rendering other nodes as-is
    },
  });
  return <section id="articleContent">{processedContent}</section>;
};

export default Article;
