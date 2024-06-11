import Image from 'next/image';

const RoundedImage = ({
  src,
  width,
  height,
  priority = false,
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
      className="rounded-2xl object-cover shrink-0 cursor-pointer"
      priority={priority}
    />
  );
};

export default RoundedImage;
