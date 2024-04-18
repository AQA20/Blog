import Image from 'next/image';

const RoundedImage = ({ src, width, height, alt = '' }) => {
  return (
    <div className="flex items-center justify-center overflow-hidden  w-[120px]">
      <Image
        width={width}
        height={height}
        src={src}
        alt={alt}
        className="my-2 rounded-lg object-cover shrink-0 h-[120px]"
      />
    </div>
  );
};

export default RoundedImage;
