'use client';

import Image from 'next/image';
import { createBreakpoint } from 'react-use';

const useBreakpoint = createBreakpoint({
  sm: 640,
  // => @media (min-width: 640px) { ... }
  md: 768,
  // => @media (min-width: 768px) { ... }
  lg: 1024,
  // => @media (min-width: 1024px) { ... }
  xl: 1280,
  // => @media (min-width: 1280px) { ... }
  '2xl': 1536,
});

const RoundedImage = ({
  src,
  width = 120,
  height = 80,
  priority = false,
  alt = '',
  onClick = () => null,
}) => {
  const breakpoint = useBreakpoint();

  return (
    <div
      style={{
        width: breakpoint === 'sm' ? '120px' : `${width}px`,
        height: breakpoint === 'sm' ? '80px' : `${height}px`,
      }}
      className="overflow-hidden rounded-lg w-full"
    >
      <Image
        onClick={onClick}
        width={width}
        height={height}
        src={src}
        alt={alt}
        className="rounded-[8px] h-full w-full object-cover shrink-0 cursor-pointer"
        priority={priority}
      />
    </div>
  );
};

export default RoundedImage;
