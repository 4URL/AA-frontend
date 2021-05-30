import React from 'react';
import styled, { css, keyframes } from 'styled-components';

import InputContainer from './input/InputContainer';
import CategoryContainer from './category/CategoryContainer';

import { pxToVw } from '../../utility/utility';
import size from '../../StyledVariable';

// wrap input & category
const SearchBarView = ({ categories }) => {
  return (
    <SearchWrap>
      <InputContainer />
      <CategoryContainer categories={categories} />
    </SearchWrap>
  );
};

// 검색 전체를 감싸고 있는 wrap div
const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 395px;
  height: 48px;
  position: absolute;
  left: 10px;
  top: 20px;
  z-index: 10;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px 20px;
  box-shadow: 1px 3px 2px #9e9e9e;
  align-items: center;

  @media (max-width: ${size.laptop}) {
    width: ${pxToVw(330)};
  }

  @media (max-width: ${size.mobileL}) {
    position: absolute;
    //모바일이면 중앙에 위치
    left: 50%;
    transform: translateX(-50%);
    width: 88%;
  }

  @media (max-width: ${size.mobileS}) {
    width: 90%;
  }
`;

export default SearchBarView;
