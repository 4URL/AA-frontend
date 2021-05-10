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
  // const [categoryList, setCategoryList] = useState([]);
  const [categoryList, setCategoryList] = useState(() => {
    const seqList = [];
    props.categoryData.forEach(category => {
      seqList.push(category['seq']);
    });
    return seqList;
  });
  const [searchData, setSearchData] = useState({
    location: '',
    searchValue: ''
  });
  const searchInputRef = useRef(null);

  useEffect(async () => {
    try {
      // const data = await reqGetCategoryData();
      // const seqList = [];
      // data.forEach((category) => {
      //   seqList.push(category['seq']);
      // });
      // setCategoryData([...categoryData, ...data]);
      // setCategoryList([...categoryList, ...seqList]);
      // console.log('first');
      // console.log('seqList :: ', seqList);
    } catch (e) {
      console.log(e);
    }
  }, []);

  // 검색결과와 카테고리 리스트의 state가 변경됐을 때 작동하는 useEffect 작성
  useEffect(() => {
    handleSearchLocation(searchData, categoryList);
  }, [searchData, categoryList]);

  // 카테고리 클릭시 발생할 이벤트
  // TODO: 클릭했을 때 목록이 추가되도록, default는 전체임
  // 클릭할 때만 하는게 아니라 기본적으로 이 과정이 이뤄져야 한다
  const onClickCategory = useCallback(
    e => {
      const categoryObj = e.currentTarget;
      console.log(categoryObj);
      // const isSelected = categoryObj.getAttribute('data-isselected');
      const value = categoryObj.getAttribute('value');
      changeCategoryBackground(categoryObj);
      // if (isSelected !== 'true') {
      //   categoryObj.setAttribute('data-isselected', 'true');
      //   setCategoryList(categoryList.concat(value));
      // } else {
      //   categoryObj.removeAttribute('data-isselected');
      //   setCategoryList(categoryList.filter(category => category !== value));
      // }
    },
    [categoryList]
  );

  // 카테고리 아이템  생성하기
  const getCategoryDomList = useMemo(() => {
    let categoryArr = categoryData.concat();
    // @ 여기서 모든 카테고리 컴포넌트가 만들어진다
    categoryArr = props.categoryData.map((obj, idx) => {
      // setCategoryList([...categoryList], obj['seq']);
      return <CategoryView key={idx} obj={obj} idxValue={idx} onClickCategory={onClickCategory} />;
    });

    return categoryArr;
  }, [categoryData]);

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
    let searchKeyword = '';
    let searchLocation = '';

    // todo: searchData에 location, searchValue가 당장 사용하지는 않는데 한데 일단 냅둠
    searchKeyword = searchKeyword.trim();

    // 버튼을 클릭했을 때 input에 담겨 있는 값을 postData에 담아준다
    searchLocation = searchInputRef.current.value;
    // 입력한 값이 공백이면 동작 안함
    if (searchLocation.trim() == '') return;
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
  const handleSearchLocation = useCallback(
    (postData, categoryList) => {
      props.changeLocation(postData, categoryList);
      closeDetailSection();
    },
    [categoryList]
  );

  function closeDetailSection() {
    props.showDetail(false);
  }

  // TODO: 컴포넌트를 파라미터로 받고 attribute를 바꿔 줌으로써 background-color를 바꿔주는 함수가 필요하다
  // handleCategoryList, background를 따로 하면 처음에 component가 형성 될 때도 사용할 수 있을 듯?
  const changeCategoryBackground = useCallback(component => {
    const isSelected = component.getAttribute('data-isselected');
    if (isSelected === 'true') {
      component.removeAttribute('data-isselected');
      handleCategoryList(component, 'remove');
    } else {
      component.setAttribute('data-isselected', 'true');
      handleCategoryList(component, 'add');
    }
  }, []);

  // TODO: 검색할 category를 관리하는 state를 변경한다
  const handleCategoryList = useCallback((component, action) => {
    console.log('categoryList :: ', categoryList);
    const componentValue = parseInt(component.getAttribute('value'));
    if (action === 'add') {
      // 카테고리가 배열에 추가되야 하고
      // 새로운 값이고
      // setCategoryList([...categoryList, componentValue]);
    } else {
      // 원하는 값이 배열에서 없어져야 한다
      // 그러면 이게 배열이 맞는가? 객체가 맞는가?
      const categories = [...categoryList];
      console.log('categories before click :: ', categories);
      // const result = categories.filter(category => category !== componentValue);
      // setCategoryList([result]);
    }
  }, []);

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
