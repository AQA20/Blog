'use client';

import parse from 'html-react-parser';
import { TweetComponent } from '@/components/Embeds/TweetComponent';
import { FacebookEmbed } from '@/components/Embeds/FacebookEmbed';
import { InstagramEmbed } from '../Embeds/InstagramEmbed';
import './style.css';

const Article = ({ content }) => {
  console.log(content);
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
      }

      return null; // Default to rendering other nodes as-is
    },
  });
  return <section id="articleContent">{processedContent}</section>;
};

export default Article;
