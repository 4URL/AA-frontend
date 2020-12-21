import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon, SearchIcon } from '../views/StyledComponents';
// import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon } from '../views/StyledComponents';
import { changeLocation } from '../../../redux/actions/index';

import SearchContainer from '../../search/container/SearchContainer';

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
    // <SearchBarContainer>
    //   <SearchBarDiv size={6}>
    //     <SearchBarInput type="text" placeholder="지도 검색" onChange={e => updateInput(e.target.value)} />
    //   </SearchBarDiv>

    //   <SearchBarIcon size={1}>
    //     <SearchIcon onClick={() => handleSearchLocation(props)} />
    //   </SearchBarIcon>

    // </SearchBarContainer>
    <SearchContainer />
  );
};

const mapStateToProps = state => {
  return state;
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
  mapStateToProps, // mapStateToProps: store와 props가 연결
  mapDispatchToProps // mapDispatchProps: action과 props가 연결
)(SearchBar);
