import React, { useMemo } from 'react';
import styled from 'styled-components';

const CategoryWrapView = ({ categoryDomList, categoryData }) => {
  return (
    <CategoryWrapper>
      <CategoryList>{categoryDomList}</CategoryList>
    </CategoryWrapper>
  );
};

export default CategoryWrapView;

// 카테고리 아이템을 감싸는 div
const CategoryWrapper = styled.div`
  background-color: #fff;
  position: absolute;
  top: 55px;
  left: 0;
  width: 395px;
  height: 95px;
  border-radius: 8px;
  box-shadow: 1px 3px 2px #9e9e9e;
  box-sizing: border-box;
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: block;
  }
`;

// grid inside wrapper div
const CategoryList = styled.div`
  display: grid;
  grid-template-columns: auto repeat(4, 90px) auto;
  grid-template-rows: repeat(2, 1fr);
  grid-template-areas:
    '. restaurant cafe hotel pets .'
    '. home campground guitar . .';
  height: 100%;
  align-items: center;
  justify-items: center;
  gap: 5px;
  padding: 10px 5px;
`;
