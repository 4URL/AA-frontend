import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import size from '../../../StyledVariable';

const InputView = ({ searchInputRef, onInputSearchInput, onClickSearchIcon }) => {
  return (
    <>
      <SearchKeywordInput ref={searchInputRef} onKeyUp={onInputSearchInput} placeholder="지역명으로 검색" />
      <SearchIcon onClick={onClickSearchIcon}></SearchIcon>
    </>
  );
};

// search input
const SearchKeywordInput = styled.input`
  width: 320px;
  height: 20px;
  outline: none;
  border-radius: 5px;
  font-size: 15px;
  font-family: 'Nanum Gothic', sans-serif;

  @media (max-width: ${size.mobile}) {
    width: 100%;
  }
`;

// delete icon
import { Close } from '@styled-icons/evaicons-solid/Close';

const DeleteSearchItemIcon = styled(Close)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

// search icon
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

export default InputView;
