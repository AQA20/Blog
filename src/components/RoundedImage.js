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
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className="overflow-hidden rounded-lg w-full"
    >
      <Image
        onClick={onClick}
        width={width}
        height={height}
        src={src}
        alt={alt}
        className="rounded-2xl h-full w-full object-cover shrink-0 cursor-pointer"
        priority={priority}
      />
    </div>
  );
};

export default RoundedImage;
