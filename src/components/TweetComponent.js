import Image from 'next/image';
import { Tweet } from 'react-tweet';

export const TweetComponent = ({ id }) => {
  const components = {
    AvatarImg: (props) => <Image {...props} />,
    MediaImg: (props) => <Image {...props} fill unoptimized />,
  };
  return (
    <div className="tweet-container">
      <Tweet id={id} components={components} />
    </div>
  );
};
