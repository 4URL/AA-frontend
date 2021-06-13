import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.min.css';
import './style.css';

// 여기에 안들어간다..
const MobileCategoryWrapView = ({ categoryDomList }) => {
  console.log('categoryDomList :: ', categoryDomList);
  return (
    <Swiper slidesPerView={4} freeMode={true} className={'swiperContainer'}>
      <SwiperSlide>식당</SwiperSlide>
      <SwiperSlide>카페</SwiperSlide>
    </Swiper>
  );
};

export default MobileCategoryWrapView;
