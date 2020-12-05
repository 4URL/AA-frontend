import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import styledVariable from '../views/StyledVariable';
import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon } from '../views/StyledComponents';
import { changeLocation } from '../../../redux/actions/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = props => {
  const history = useHistory();

  const [location, setLocation] = useState('');

  const updateInput = input => {
    console.log('입력한 장소는 ', input);
    setLocation(input);
  };

  const handleSearchLocation = () => {
    console.log('store의 location값을 변경해주는 함수, handleSearchLocation');
    props.changeLocation(location);
    setLocation('');
    // history.push(`${location}`);
  };

  return (
    <SearchBarContainer>
      <SearchBarDiv size={6}>
        <SearchBarInput type="text" placeholder="지도 검색" onChange={e => updateInput(e.target.value)} />
      </SearchBarDiv>

      <SearchBarIcon size={1}>
        <FontAwesomeIcon icon={faSearch} style={{ color: '#949494' }} onClick={handleSearchLocation} />
      </SearchBarIcon>
    </SearchBarContainer>
  );
};

export default connect(
  null, // mapStateToProps: store와 props가 연결
  { changeLocation } // mapDispatchProps: action과 props가 연결
)(SearchBar);
