import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import { changeLocation, showDetail, changePageNumber } from '../../../redux/actions/index';
import { reqGetCategoryData } from '../../../api/api';
import SearchView from '../views/SearchView';
import CategoryView from '../views/CategoryView';

const SearchContainer = memo(props => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchData, setSearchData] = useState({
    location: '',
    searchValue: ''
  });
  const searchInputRef = useRef(null);

  useEffect(async () => {
    try {
      const data = await reqGetCategoryData();
      setCategoryData(data.concat());
    } catch (e) {
      console.log(e);
    }
  }, []);

  // 검색결과와 카테고리 리스트의 state가 변경됐을 때 작동하는 useEffect 작성
  useEffect(() => {
    handleSearchLocation(searchData, categoryList);
  }, [searchData, categoryList]);

  // 카테고리 클릭시 발생할 이벤트
  const onClickCategory = useCallback(
    e => {
      const categoryObj = e.target;
      const isSelected = categoryObj.getAttribute('isSelected');
      const value = categoryObj.getAttribute('value');
      if (isSelected != 'true') {
        categoryObj.setAttribute('isSelected', 'true');
        setCategoryList(categoryList.concat(value));
      } else {
        categoryObj.removeAttribute('isSelected');
        setCategoryList(categoryList.filter(category => category !== value));
      }
    },
    [categoryList]
  );

  // 카테고리 아이템  생성하기
  const getCategoryDomList = useMemo(() => {
    let categoryArr = categoryData.concat();

    categoryArr = categoryArr.map((obj, idx) => {
      return <CategoryView key={idx} obj={obj} idxValue={idx} onClickCategory={onClickCategory} />;
    });

    return categoryArr;
  }, [categoryData]);

  // 검색 input의 input 이벤트
  const onInputSearchInput = useCallback(
    e => {
      console.log('searchData :: ', searchData);
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
    let searchKeyword = '';
    let searchLocation = '';

    // todo: searchData에 location, searchValue가 당장 사용하지는 않는데 한데 일단 냅둠
    searchKeyword = searchKeyword.trim();

    // 버튼을 클릭했을 때 input에 담겨 있는 값을 postData에 담아준다
    searchLocation = searchInputRef.current.value;
    // 입력한 값이 공백이면 동작 안함
    if (searchLocation.trim() == '') return;
    console.log('searchLocation :: ', searchLocation);
    props.changePageNumber(1);
    setSearchData({
      ...searchData,
      location: searchLocation,
      searchValue: searchKeyword
    });

    // input 초기화
    searchInputRef.current.value = '';
  }, [searchData, categoryList]);

  /**
   * 입력한 값을 redux에 전달하는 함수
   * @param {Object} postData : { location: [], searchValue: '' }
   * @param {Array} categoryList : []
   */
  function handleSearchLocation(postData, categoryList) {
    props.changeLocation(postData, categoryList);
    closeDetailSection();
  }

  function closeDetailSection() {
    props.showDetail(false);
  }

  return (
    <SearchView
      searchInputRef={searchInputRef}
      onInputSearchInput={debouncedSearchInput}
      onClickSearchIcon={onClickSearchIcon}
      getCategoryDomList={getCategoryDomList}
    />
  );
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
