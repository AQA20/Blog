import Image from 'next/image';

const RoundedImage = ({ src, width, height, alt = '' }) => {
  return (
    <Image
      width={width}
      height={height}
      src={src}
      alt={alt}
      className="rounded-2xl object-cover shrink-0 "
    />
  );
};

export default RoundedImage;
