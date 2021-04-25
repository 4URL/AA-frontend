import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { KeyboardArrowDown, KeyboardArrowUp } from '@styled-icons/material-rounded';

import { pxToVw } from '../../../utility/utility';
import size from '../../../StyledVariable';

const SearchView = ({ searchInputRef, onInputSearchInput, onClickSearchIcon, getCategoryDomList }) => {
  const [toggleCategory, setToggleCategory] = useState(false);

  // todo: 이 부분이 7번 호출됨 왜?
  console.log('getCategoryDomList :: ', getCategoryDomList);

  return (
    <SearchWrap>
      <SearchKeywordInput ref={searchInputRef} onKeyUp={onInputSearchInput} placeholder="지역명으로 검색" />
      <SearchIcon onClick={onClickSearchIcon}></SearchIcon>
      {/* <CategoryWrap>{getCategoryDomList}</CategoryWrap> */}
      <CategoryContainer toggled={toggleCategory}>
        <CategoryList>{getCategoryDomList}</CategoryList>
      </CategoryContainer>
    </SearchWrap>
  );

  // function clickToggleButton() {
  //   const toggle = !toggleCategory;
  //   setToggleCategory(toggle);
  // }
};

// 검색 전체를 감싸고 있는 wrap div
const SearchWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: ${pxToVw(380)};
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

// 검색 input
const SearchKeywordInput = styled.input`
  width: 320px;
  height: 20px;
  /* margin-right: 10px; */
  /* margin-left: 5px; */
  /* border: 1px solid #101010; */
  /* padding: 0px 10px; */
  outline: none;
  border-radius: 5px;
  font-size: 15px;
  /* line-height: 14px; */
  font-family: 'Nanum Gothic', sans-serif;
  /* background-color: teal; */

  @media (max-width: ${size.mobile}) {
    width: 100%;
  }
`;

// 삭제 아이콘
import { Close } from '@styled-icons/evaicons-solid/Close';

const DeleteSearchItemIcon = styled(Close)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

// 검색 아이콘
import { Search } from '@styled-icons/fa-solid';

const SearchIcon = styled(Search)`
  color: #949494;
  width: 20px;
  height: 20px;
  cursor: pointer;

  @media (max-width: ${size.mobile}) {
    width: 18px;
    height: 18px;
  }
`;

// CategoryContainer를 위한 toggle animation
const easeOut = css`
  height: 145px;
  transition: height 0.15s ease-out;
`;

const easeIn = css`
  height: 85px;
  transition: height 0.15s ease-in;
`;

// 카테고리 아이템을 감싸는 div
const CategoryContainer = styled.div`
  background-color: #fff;
  position: absolute;
  top: 55px;
  right: 0;
  width: ${pxToVw(380)};
  ${({ toggled }) => (toggled ? easeOut : easeIn)};
  border-radius: 8px;
  box-shadow: 1px 3px 2px #9e9e9e;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* flex-direction: column; */
  /* flex-wrap: nowrap; */
  /* overflow-x: auto; */
  /* padding: 0 30px; */
  box-sizing: border-box;
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: block;
  }
`;

const CategoryList = styled.div`
  /* position: relative; */
  /* width: 100%; */
  /* height: 100%; */
  /* position: absolute;
  left: 50%;
  transform: translateX(-50%); */
  display: inline-block;
  /* display: flex;
  flex-wrap: wrap;
  overflow: hidden; */
  /* justify-content: space-between; */
`;

export default SearchView;

/*
// 검색 키워드 감싸는 div
const SearchKeyWrap = styled.div`
  position: absolute;
  top: 60px;
  width: 30%;
  box-sizing: border-box;
  border: 1px solid #2f2f2f;
`;

// 검색 키워드 아이템 div
const SearchKeyItem = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  border-top: 1px solid #101010;
  &[focused='true'] {
    background-color: yellow;
  }
  &:hover {
    background-color: skyblue;
  }
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: block;
  }
  &:first-child {
    border-top: none;
  }
`;

// 지역명
const SearchText = styled.div`
  width: 60px;
  height: 30px;
  line-height: 30px;
  margin-right: 2px;
`;
*/

/*
// 검색할 아이템을 감싸는 div
const SearchItemListWrap = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  height: 20px;
  border: 1px solid #101010;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

// 검색할 아이템들 div
const SearchItem = styled.span`
  border: 1px solid brown;
  border-radius: 5px;
  margin: 0 5px;
  background-color: ${props => {
    switch (props.type) {
      case 'location':
        return 'lightcoral';

      case 'keyword':
        return 'aquamarine';
      default:
        return '#666666';
    }
  }};
`;

// 검색할 아이템 Text div
const SearchItemText = styled.span``;
*/
