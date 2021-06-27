import React, { useCallback, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';

import { RestaurantIcon, HotelIcon, CafeIcon, PetsIcon, HomeIcon, CampgroundIcon, GuitarIcon } from './IconComponents';

import 'swiper/swiper.min.css';
import './style.css';

// 여기에 안들어간다..
const MobileCategoryWrapView = ({ categories, onClickCategory }) => {
  const categorySwitch = useCallback(
    seq => {
      let icon = null;
      let categoryName = null;
      let type = 0;

      switch (seq) {
        case 1:
          icon = <RestaurantIcon />;
          categoryName = '식당';
          type = 1;
          break;
        case 2:
          icon = <CafeIcon />;
          categoryName = '카페';
          type = 2;
          break;
        case 3:
          icon = <HotelIcon />;
          categoryName = '숙소';
          type = 3;
          break;
        case 4:
          icon = <PetsIcon />;
          categoryName = '호텔';
          type = 4;
          break;
        case 5:
          icon = <HomeIcon />;
          categoryName = '펜션';
          type = 5;
          break;
        case 6:
          icon = <CampgroundIcon />;
          categoryName = '놀이터';
          type = 6;
          break;
        default:
          icon = <GuitarIcon />;
          categoryName = '기타';
          type = 99;
          break;
      }

      return (
        <Category>
          <IconWrap>{icon}</IconWrap>
          <ContentsWrap>{categoryName}</ContentsWrap>
        </Category>
      );
    },
    [categories]
  );

  const makeCategoryList = useMemo(() => {
    return categories.map((category, idx) => {
      return (
        <SwiperSlide key={idx} value={category['seq']} onClick={onClickCategory} data-isselected="true">
          {categorySwitch(category['seq'])}
        </SwiperSlide>
      );
    });
  }, [categories]);

  return (
    <Swiper slidesPerView={3.5} spaceBetween={10} freeMode={true}>
      {makeCategoryList}
    </Swiper>
  );
};

// SwiperContainer는 Swiper에 적용해야 함
const SwiperContainer = styled.div.attrs({
  className: 'swiper-container'
})`
  background-color: red;
`;

// CategoryWrap은 styles.css를 통해서 SwiperSlide에 css를 적용해야 할 듯
const CategoryWrap = styled.button.attrs({
  'data-isselected': 'true'
})`
  &[data-isselected='true'] {
    background-color: #f0f0f0;
  }
  color: #3f4040;
`;

// 카테고리 아이템 div
const Category = styled.div`
  /* height: 100%; */
`;

const IconWrap = styled.div`
  display: inline-block;
  height: 25px;
  width: 25px;
  margin-right: 5px;
  line-height: 25px;
`;

const ContentsWrap = styled.div`
  height: 20px;
  font-size: 12px;
  line-height: 20px;
  display: inline-block;

  ${CategoryWrap}:hover & {
    color: #1e90ff;
  }
`;

export default MobileCategoryWrapView;
