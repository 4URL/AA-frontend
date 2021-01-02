import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { SearchBarContainer, SearchBarDiv, SearchBarInput, SearchBarIcon, SearchIcon } from '../views/StyledComponents';
import { changeLocation, showDetail } from '../../../redux/actions/index';

import SearchContainer from '../../search/container/SearchContainer';

const SearchBar = props => {
  // const [location, setLocation] = useState('');

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

    // <SearchBarContainer>
    //   <SearchBarDiv size={6}>
    //     <SearchBarInput type="text" placeholder="지도 검색" onChange={e => handleChange(e.target.value)} onKeyPress={e => handleKeyPress(e, props)} />
    //   </SearchBarDiv>

    //   <SearchBarIcon size={1}>
    //     <SearchIcon onClick={() => handleSearchLocation(props)} />
    //   </SearchBarIcon>
    // </SearchBarContainer>
  );

  // function handleChange(input) {
  //   setLocation(input);
  // }

  // function handleSearchLocation(props) {
  //   props.changeLocation(location);
  //   closeDetailSection();
  // }

  // function handleKeyPress(event, props) {
  //   if (event.key === 'Enter') props.changeLocation(location);
  //   closeDetailSection();
  // }

  // function closeDetailSection() {
  //   props.showDetail(false);
  // }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeLocation,
      showDetail
    },
    dispatch
  );
};

export default connect(
  mapStateToProps, // mapStateToProps: store와 props가 연결
  mapDispatchToProps // mapDispatchProps: action과 props가 연결
)(SearchBar);
