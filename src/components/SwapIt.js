'use client';

import { Children, cloneElement } from 'react';
import { register } from 'swiper/element/bundle';

register();

const SwapIt = ({ slidesPerView, children }) => {
  const swiperChildren = Children.map(children, (child, index) => {
    return cloneElement(<swiper-slide>{child}</swiper-slide>, { key: index });
  });
  return (
    <swiper-container slides-per-view={slidesPerView}>
      {swiperChildren}
    </swiper-container>
  );
};

export default SwapIt;
