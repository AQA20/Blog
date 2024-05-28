'use client';

import { Children, cloneElement } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SwapIt = ({ slidesPerView, children }) => {
  const swiperChildren = Children.map(children, (child, index) => {
    return cloneElement(<SwiperSlide className="!w-fit">{child}</SwiperSlide>, {
      key: index,
    });
  });
  return (
    <div>
      <Swiper
        className="flex justify-center items-center"
        slidesPerView={slidesPerView}
      >
        {swiperChildren}
      </Swiper>
    </div>
  );
};

export default SwapIt;
