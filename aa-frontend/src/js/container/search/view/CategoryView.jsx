import React from 'react';
import styled from 'styled-components';

const CategoryView = ({ obj, idxValue, onClickCategory }) => {
  return (
    <Category idx={idxValue} value={obj['seq']} type={obj['seq']} onClick={onClickCategory}>
      {obj['categoryName']}
    </Category>
  );
};

export default CategoryView;

// 카테고리 아이템 div
const Category = styled.div`
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  font-size: 14px;
  padding: 0px 1px;
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
