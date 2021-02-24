import React from 'react';
import styled from 'styled-components';

import { pxToVw } from '../../../utility/utility';

const CategoryView = ({ obj, idxValue, onClickCategory }) => {
  return (
    <CategoryWrap idx={idxValue} value={obj['seq']} type={obj['seq']} onClick={onClickCategory}>
      <Category>{obj['categoryName']}</Category>
    </CategoryWrap>
  );
};

const CategoryWrap = styled.div`
  height: 60px;
  /* width: ${pxToVw(60)}; */
`;

// 카테고리 아이템 div
const Category = styled.div`
  width: ${pxToVw(60)};
  height: 60px;
  /* flex: 0 0 auto; */
  /* display: inline-block; */
  border-radius: 5px;
  cursor: pointer;
  /* margin: 2px; */
  font-size: 14px;
  margin-right: 5px;
  /* padding: 0px 1px; */
  background-color: ${props => {
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
  }
`;

export default CategoryView;
