import Image from 'next/image';

const RoundedImage = ({ src, width, height, alt = '' }) => {
  return (
      <img
        width="100%"
        src={src}
        alt={alt}
        className="rounded-2xl object-cover shrink-0 "
      />
  );
};

export default RoundedImage;
