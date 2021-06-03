import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { changeLocation, showDetail, changePageNumber } from '../../../redux/actions/index';
import InputView from './InputView';

// input 이랑 category가 너비 별로 변경되는게 다르다
const SearchContainer = memo(props => {
  const [searchData, setSearchData] = useState({
    location: '',
    searchValue: ''
  });
  const searchInputRef = useRef(null);

  // 검색 input의 input 이벤트
  const onInputSearchInput = useCallback(
    e => {
      const eventKey = e.key;
      // setSearchValue(keyword);
      if (eventKey == 'Enter') {
        onClickSearchIcon();
      }
    },
    [searchData]
  );

  const debouncedSearchInput = _.debounce(onInputSearchInput, 500);

  // 검색 아이콘 클릭 이벤트
  const onClickSearchIcon = useCallback(() => {
    // let searchKeyword = '';
    let searchLocation = '';

    // todo: searchData에 location, searchValue가 당장 사용하지는 않는데 한데 일단 냅둠
    // searchKeyword = searchKeyword.trim();

    // 버튼을 클릭했을 때 input에 담겨 있는 값을 postData에 담아준다
    searchLocation = searchInputRef.current.value;
    // 입력한 값이 공백이면 동작 안함
    if (searchLocation.trim() == '') return;
    props.changePageNumber(1);
    setSearchData({
      ...searchData,
      location: searchLocation
      // searchValue: searchKeyword
    });

    // input 초기화
    searchInputRef.current.value = '';
  }, [searchData]);

  return <InputView searchInputRef={searchInputRef} onInputSearchInput={debouncedSearchInput} onClickSearchIcon={onClickSearchIcon} />;
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      changeLocation,
      showDetail,
      changePageNumber
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
