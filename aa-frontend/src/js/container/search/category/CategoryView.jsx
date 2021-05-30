import React from 'react';
import styled, { css } from 'styled-components';
import { Restaurant, Hotel, Pets } from '@styled-icons/material-rounded';
import { Cafe } from '@styled-icons/ionicons-outline';
import { Home } from '@styled-icons/boxicons-regular';
import { Campground, Guitar } from '@styled-icons/fa-solid';

const CategoryView = ({ category, idxValue, onClickCategory }) => {
  return (
    <CategoryWrap idx={idxValue} value={category['seq']} type={category['seq']} onClick={onClickCategory}>
      {categorySwitch(category['seq'])}
    </CategoryWrap>
  );

  function categorySwitch(seq) {
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
  }
};

const CategoryWrap = styled.button.attrs({
  'data-isselected': 'true'
})`
  &[data-isselected='true'] {
    background-color: #f0f0f0;
  }
  background: none;
  box-sizing: border-box;
  height: 35px;
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
  color: #1e90ff;
`;

const HotelIcon = styled(Hotel)`
  ${category}
  color: #FFBC42;
`;

const CafeIcon = styled(Cafe)`
  ${category}
  color: #1e90ff;
`;

const PetsIcon = styled(Pets)`
  ${category}
  color: #79bd9a;
`;

const HomeIcon = styled(Home)`
  ${category}
  color: #FFBC42;
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
