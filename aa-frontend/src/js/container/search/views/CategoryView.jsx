import React from 'react';
import styled, { css } from 'styled-components';
import { Restaurant, Hotel, Pets } from '@styled-icons/material-rounded';
import { Cafe } from '@styled-icons/ionicons-outline';
import { Home } from '@styled-icons/boxicons-regular';
import { Campground, Guitar } from '@styled-icons/fa-solid';

import { pxToVw } from '../../../utility/utility';
/*
  TODO: 클릭시 배경색이 바뀌므로 padding이나 그런게 맞도록 할 것
*/

const CategoryView = ({ obj, idxValue, onClickCategory }) => {
  // 이 부분이 클릭될 때 마다 다시 렌더링 되야하는거 아닌가?
  return (
    <CategoryWrap idx={idxValue} value={obj['seq']} type={obj['seq']} onClick={onClickCategory}>
      {categorySwitch(obj['categoryName'])}
    </CategoryWrap>
  );

  function categorySwitch(name) {
    let icon = null;
    let categoryName = null;
    /*
      const categorySeq = {
        RESTAURANT: 1,
        CAFE: 2,
        HOTEL_RESORT: 3,
        PET_HOTEL: 4,
        PENSION: 5,
        PLAYGROUND: 6,
        ETC: 99
      };
    */
    let type = 0;

    switch (name) {
      case '식당':
        icon = <RestaurantIcon />;
        categoryName = '식당';
        type = 1;
        break;
      case '카페':
        icon = <CafeIcon />;
        categoryName = '카페';
        type = 2;
        break;
      case '호텔&리조트':
        icon = <HotelIcon />;
        categoryName = '숙소';
        type = 3;
        break;
      case '반려동물호텔':
        icon = <PetsIcon />;
        categoryName = '호텔';
        type = 4;
        break;
      case '펜션':
        icon = <HomeIcon />;
        categoryName = '펜션';
        type = 5;
        break;
      case '애견놀이터':
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
      // <>
      //   <IconWrap>{icon}</IconWrap>
      //   <ContentsWrap>{categoryName}</ContentsWrap>
      // </>
    );
  }
};

const CategoryWrap = styled.button`
  // TODO: row별로 해야 한다
  // grid를 사용하면 될듯?
  // => 내가 개별적으로 해줘야한다는 단점이 있지만 카테고리를 추가하는 건 자동화가 필요한 부분은 아니기 때문에
  // 괜찮을거 같음
  background: none;
  box-sizing: border-box;
  /* border: 2px solid #fff; */
  height: 35px;
  /* width: ${pxToVw(90)}; */
  width: 100%;
  border-radius: 6px;
  grid-area: ${props => {
    switch (props.type) {
      case 1:
        return 'restaurant';
      case 2:
        return 'hotel';
      case 3:
        return 'cafe';
      case 4:
        return 'pets';
      case 5:
        return 'home';
      case 6:
        return 'campground';
      default:
        return 'guitar';
    }
  }};
  /* display: flex; */
  /* padding-left: 15px; */
  /* align-items: center; */
  cursor: pointer;
  color: #3f4040;
  font-weight: 600;
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  /* display: inline-block; */

  /* &:nth-child(-n + 4) {
    margin-top: 3px;
  }

  &:nth-child(4) {
    margin-right: 4px;
  } */

  /* background-color: ${props => {
    switch (props.type) {
      default:
        return '#666666';
    }
  }};
  color: ${props => {
    switch (props.type) {
      default:
        return '#ffffff';
    }
  }}; */
  &[isselected='true'] {
    background-color: ${props => {
      switch (props.type) {
        default:
          return '#f0f0f0';
      }
    }};
  }
`;

// 카테고리 아이템 div
const Category = styled.div`
  /* height: 100%; */
`;

const category = css`
  height: 25px;
  width: 25px;
`;

const IconWrap = styled.div`
  display: inline-block;
  height: 25px;
  width: 25px;
  margin-right: 5px;
  line-height: 25px;
`;

const RestaurantIcon = styled(Restaurant)`
  ${category}
  color: #FFBC42;
`;

const HotelIcon = styled(Hotel)`
  ${category}
  color: #8F2D56;
`;

const CafeIcon = styled(Cafe)`
  ${category}
  color: #FFBC42;
`;

const PetsIcon = styled(Pets)`
  ${category}
  color: #79bd9a;
`;

const HomeIcon = styled(Home)`
  ${category}
  color: #8F2D56;
`;

const CampgroundIcon = styled(Campground)`
  ${category}
  color: #79bd9a;
`;

const GuitarIcon = styled(Guitar)`
  ${category}
`;

const ContentsWrap = styled.div`
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  display: inline-block;

  ${CategoryWrap}:hover & {
    color: #1e90ff;
  }
`;

export default CategoryView;
