'use client';

import { Children } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const SwapIt = ({
  slidesPerView = 1,
  spaceBetween = 30,
  childStyle = '',
  children,
}) => {
  const swiperChildren = Children.map(children, (child, index) => (
    <SwiperSlide key={index} className={childStyle}>
      {child}
    </SwiperSlide>
  ));
  return (
    <div>
      <Swiper
        className="flex justify-center items-center"
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        centeredSlides={false}
        lazy="true"
      >
        {swiperChildren}
      </Swiper>
    </div>
  );
};

export default SwapIt;
