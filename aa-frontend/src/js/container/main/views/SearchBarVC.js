import React from 'react';
import styledVariable from './StyledVariable';
import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon } from './StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBarVC = () => {
  return (
    <SearchBarContainer>
      <SearchBarDiv size={6}>
        <SearchBarInput type="text" placeholder="지도 검색" />
      </SearchBarDiv>

      <SearchBarIcon size={1}>
        <FontAwesomeIcon icon={faSearch} style={{ color: '#949494' }} />
      </SearchBarIcon>
    </SearchBarContainer>
  );
};

export default SearchBarVC;
