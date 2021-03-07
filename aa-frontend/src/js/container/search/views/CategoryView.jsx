import React from 'react';
import styled, { css } from 'styled-components';
import { Restaurant, Hotel, Pets } from '@styled-icons/material-rounded';
import { Cafe } from '@styled-icons/ionicons-outline';
import { Home } from '@styled-icons/boxicons-regular';
import { Campground, Guitar } from '@styled-icons/fa-solid';

import { pxToVw } from '../../../utility/utility';

const CategoryView = ({ obj, idxValue, onClickCategory }) => {
  return (
    <CategoryWrap idx={idxValue} value={obj['seq']} type={obj['seq']} onClick={onClickCategory}>
      <Category>{categorySwitch(obj['categoryName'])}</Category>
    </CategoryWrap>
  );

  function categorySwitch(name) {
    switch (name) {
      case '식당':
        return (
          <>
            <RestaurantIcon />
            식당
          </>
        );
      case '카페':
        return (
          <>
            <CafeIcon />
            카페
          </>
        );
      case '호텔&리조트':
        return (
          <>
            <HotelIcon />
            {'숙소'}
          </>
        );
      case '반려동물호텔':
        return (
          <>
            <PetsIcon />
            {'호텔'}
          </>
        );
      case '펜션':
        return (
          <>
            <HomeIcon />
            펜션
          </>
        );
      case '애견놀이터':
        return (
          <>
            <CampgroundIcon />
            {'놀이터'}
          </>
        );
      default:
        return (
          <>
            <GuitarIcon />
            기타
          </>
        );
    }
  }
};

const CategoryWrap = styled.div`
  box-sizing: border-box;
  height: 35px;
  width: ${pxToVw(90)};
  margin-left: 4px;
  margin-bottom: 5px;
  border-radius: 6px;

  &:nth-child(-n + 4) {
    margin-top: 5px;
  }

  &:nth-child(4) {
    margin-right: 4px;
  }

  &:hover {
    background-color: #3f4040;
  }
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
  }};
  &[isselected='true'] {
    background-color: ${props => {
    switch (props.type) {
      default:
        return '#222222';
    }
  }};
    color: ${props => {
    switch (props.type) {
      default:
        return '#ffffff';
    }
  }};
  } */
`;

// 카테고리 아이템 div
const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  cursor: pointer;
  font-size: 14px;
  /* line-height: 30px; */
  color: #3f4040;

  ${CategoryWrap}:hover & {
    color: #ffffff;
  }
`;

const category = css`
  margin: 0 5px;
  height: 25px;
  width: 25px;
`;

const RestaurantIcon = styled(Restaurant)`
  ${category}
`;

const HotelIcon = styled(Hotel)`
  ${category}
`;

const CafeIcon = styled(Cafe)`
  ${category}
`;

const PetsIcon = styled(Pets)`
  ${category}
`;

const HomeIcon = styled(Home)`
  ${category}
`;

const CampgroundIcon = styled(Campground)`
  ${category}
`;

const GuitarIcon = styled(Guitar)`
  ${category}
`;

export default CategoryView;
