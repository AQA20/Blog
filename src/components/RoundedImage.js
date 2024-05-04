import Image from 'next/image';

const RoundedImage = ({
  src,
  width,
  height,
  alt = '',
  onClick = () => null,
}) => {
  return (
    <Image
      onClick={onClick}
      width={width}
      height={height}
      src={src}
      alt={alt}
      className="rounded-2xl my-2 object-cover shrink-0 cursor-pointer"
    />
  );
};

export default RoundedImage;
