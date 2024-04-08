import Image from 'next/image';

const RoundedImage = ({ src, width, height, alt = '' }) => {
  return (
    <Image
      className="my-2 rounded-lg"
      src={src}
      width={width}
      height={height}
      alt={alt}
    />
  );
};

export default RoundedImage;
