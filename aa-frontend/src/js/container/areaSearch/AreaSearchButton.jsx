import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Refresh } from '@styled-icons/evaicons-solid';
import size from '../../StyledVariable';
import { setShowAreaSearch } from '../../redux/actions/index';

const AreaSearchButton = props => {
  const { showAreaSearch } = props.mapState;
  console.log('???????');
  return (
    <AreaSearch onClick={onClickAreaSearch} data-showButton={showAreaSearch}>
      <RefreshIcon />
      현재 위치에서 검색
    </AreaSearch>
  );
};

const onClickAreaSearch = () => {
  setShowAreaSearch(false);
  console.log('aa');
};

const AreaSearch = styled.button.attrs({
  'data-showButton': 'false'
})`
  &[data-showButton='true'] {
    display: inline_block;
  }
  &[data-showButton='false'] {
    display: none;
  }
  height: 45px;
  padding: 0 18px;
  border-radius: 23px;
  background: #c8ebfa;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 20%);
  white-space: nowrap;
  position: absolute;
  bottom: 30px;
  left: 50%;
  z-index: 100;
  transform: translateX(-50%);
  font-family: notosanskr, Malgun Gothic, 맑은 고딕, Dotum, 돋움, sans-serif;
  font-size: 13px;

  @media (max-width: ${size.mobileS}) {
    height: 35px;
    padding: 0 15px;
    border-radius: 18px;
    font-size: 10px;
  }
`;

const RefreshIcon = styled(Refresh)`
  width: 25px;
  height: 15px;
  padding-right: 10px;

  @media (max-width: ${size.mobileS}) {
    width: 19px;
    height: 13px;
    padding-right: 6px;
  }
`;

const mapStateToProps = state => {
  return {
    mapState: state.mapReducers
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setShowAreaSearch
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaSearchButton);
