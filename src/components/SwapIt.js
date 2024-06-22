'use client';

import { Children, cloneElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SwapIt = ({
  slidesPerView = 1,
  spaceBetween = 30,
  childStyle = '',
  children,
}) => {
  const swiperChildren = Children.map(children, (child, index) => {
    return cloneElement(
      <SwiperSlide className={childStyle}>{child}</SwiperSlide>,
      {
        key: index,
      },
    );
  });
  return (
    <div>
      <Swiper
        className="flex justify-center items-center"
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides={false}
      >
        {swiperChildren}
      </Swiper>
    </div>
  );
};

export default SwapIt;
