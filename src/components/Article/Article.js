'use client';

import parse from 'html-react-parser';
import { TweetComponent } from '@/components/Embeds/TweetComponent';
import { FacebookPostEmbed } from '@/components/Embeds/FacebookPostEmbed';
import './article.css';

const Article = ({ content }) => {
  const processedContent = parse(content, {
    replace: (domNode) => {
      // Replace <div data-tweet> with <Tweet> component
      if (
        domNode.name === 'div' &&
        domNode.attribs &&
        domNode.attribs['data-tweet']
      ) {
        const id = domNode.attribs['data-tweet'];

        return <TweetComponent id={id} />;
      } else if (
        // Replace <div data-post-url> with <FacebookPostEmbed> component
        domNode.name === 'div' &&
        domNode.attribs &&
        domNode.attribs['data-post-url']
      ) {
        const postUrl = domNode.attribs['data-post-url'];
        return <FacebookPostEmbed postUrl={postUrl} />;
      }
      return null; // Default to rendering other nodes as-is
    },
  });
  return <section id="articleContent">{processedContent}</section>;
};

export default Article;
