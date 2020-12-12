import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon } from '../views/StyledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { changeLocation } from '../../../redux/actions/index';

const SearchBar = props => {
  const [location, setLocation] = useState('');

  const updateInput = input => {
    console.log('입력한 장소는 ', input);
    setLocation(input);
  };

  const handleSearchLocation = props => {
    props.changeLocation(location);
  };

  return (
    <SearchBarContainer>
      <SearchBarDiv size={6}>
        <SearchBarInput type="text" placeholder="지도 검색" onChange={e => updateInput(e.target.value)} />
      </SearchBarDiv>

      <SearchBarIcon size={1}>
        <FontAwesomeIcon icon={faSearch} style={{ color: '#949494' }} onClick={() => handleSearchLocation(props)} />
      </SearchBarIcon>
    </SearchBarContainer>
  );
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeLocation
    },
    dispatch
  );
};

export default connect(
  null, // mapStateToProps: store와 props가 연결
  mapDispatchToProps // mapDispatchProps: action과 props가 연결
)(SearchBar);
