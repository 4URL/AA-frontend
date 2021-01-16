import React, { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeLocation, showDetail, changePageNumber } from '../../../redux/actions/index';
import { reqGetCategoryData } from '../../../api/api';

const SearchContainer = memo(props => {
  const [categoryData, setCategoryData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchKeyJsonArr, setSearchKeyJsonArr] = useState([]);
  const [searchType, setSearchType] = useState('');
  // const [searchValue, setSearchValue] = useState('');
  const [searchLocationArr, setSearchLocationArr] = useState([]);
  const [searchValueArr, setSearchValueArr] = useState([]);
  const searchInputRef = useRef(null);

  // useEffect(()=>{
  //   // reqGetCategoryData();
  // }, []);

  useEffect(async () => {
    try {
      const data = await reqGetCategoryData();
      setCategoryData(data.concat());
    } catch (e) {
      console.log(e);
    }
  }, []);

  // 검색 하단에 보여질 카테고리 아이템 정의
  // const CATEGORY_DATA = [
  //   // { type: '0', value: '0', text: '전체' },
  //   { type: '1', value: '1', text: '호텔' },
  //   { type: '2', value: '2', text: '카페' },
  //   { type: '3', value: '3', text: '놀이터' },
  //   { type: '4', value: '4', text: '아몰랑' }
  // ];

  // 검색 키워드 아이템 정의
  const SEARCH_KEY_LIST = [
    { type: 'location', value: 'location', text: '지역명' },
    { type: 'keyword', value: 'keyword', text: '검색어' }
  ];

  const getCategoryData = useMemo(() => {});

  // 카테고리 클릭시 발생할 이벤트
  const onClickCategory = useCallback(
    e => {
      const categoryObj = e.target;
      const isSelected = categoryObj.getAttribute('isSelected');
      const value = categoryObj.getAttribute('value');
      if (isSelected != 'true') {
        categoryObj.setAttribute('isSelected', 'true');
        setCategoryList(categoryList.concat(value));

        // setCategoryList([...categoryList, value]);
      } else {
        categoryObj.removeAttribute('isSelected');
        setCategoryList(categoryList.filter(category => category !== value));
      }
    },
    [categoryList]
  );
  // console.log('categoryList 1111::: ', categoryList);

  // 카테고리 아이템  생성하기
  const getCategoryDomList = useMemo(() => {
    let categoryArr = categoryData.concat();

    categoryArr = categoryArr.map((obj, idx) => {
      return (
        <Category key={idx} idx={idx} value={obj['seq']} type={obj['seq']} onClick={onClickCategory}>
          {obj['categoryName']}
        </Category>
      );
    });

    return categoryArr;
  }, [categoryData]);

  // 검색 키워드 아이템 클릭 이벤트
  const onClickSearchKeyItem = useCallback(e => {
    const keyItemObj = e.target;
    const type = keyItemObj.getAttribute('type');
    // const keyItemList = document.getElementsByClassName('search_key_item');
    // for (let i = 0; i < keyItemList.length; i++) {
    //   const item = keyItemList[i];
    //   item.removeAttribute('focused');
    // }
    removeAllFocus();
    keyItemObj.setAttribute('focused', 'true');
    setSearchType(type);
    if (searchInputRef != null) {
      hideSearchKeywordItemList();
      searchInputRef.current.focus();
    }
  }, []);

  // 검색 키워드 아이템 생성
  const getSearchKeyItemDomList = useMemo(() => {
    let searchKeyList = SEARCH_KEY_LIST.concat();

    searchKeyList = searchKeyList.map((obj, idx) => {
      return (
        <SearchKeyItem
          className={'search_key_item'}
          key={idx}
          id={'searchKey_' + obj['type']}
          idx={idx}
          value={obj['value']}
          type={obj['type']}
          onClick={onClickSearchKeyItem}>
          {obj['text']}
        </SearchKeyItem>
      );
    });

    return searchKeyList;
  });

  // 검색 키워드 포커스 초기화
  const removeAllFocus = useCallback(() => {
    const listObj = document.getElementById('keyword_list');
    const keywordArr = listObj.childNodes;
    keywordArr.forEach(element => {
      element.removeAttribute('focused');
    });
  }, []);

  // 검색 input 창 포커스 이벤트
  const onFocusSearchInput = useCallback(
    e => {
      const obj = e.target;

      if (searchType == '') {
        obj.blur();
        removeAllFocus();
        const listObj = document.getElementById('keyword_list');
        const keywordArr = listObj.childNodes;
        for (let i = 0; i < keywordArr.length; i++) {
          const obj = keywordArr[i];
          const isShow = obj.getAttribute('show');
          if (isShow != 'off') {
            obj.setAttribute('focused', 'true');
            break;
          } else {
            obj.removeAttribute('focused');
          }
        }
        showSearchKeywordItemList();
      }
    },
    [searchType]
  );

  // 검색 input의 input 이벤트
  const onInputSearchInput = useCallback(
    e => {
      const eventKey = e.key;
      const keyword = e.target.value;
      // setSearchValue(keyword);
      if (eventKey == 'Enter') {
        onClickSearchIcon();
        // const jsonData = { type: searchType, searchValue: keyword };
        // setSearchKeyJsonArr(searchKeyJsonArr.concat(jsonData));
        // if (searchType == 'location') {
        //   setSearchLocationArr(searchLocationArr.concat(keyword));
        //   const keywordObj = document.getElementById('searchKey_location');
        //   keywordObj.setAttribute('show', 'off');
        // } else if (searchType == 'keyword') {
        //   setSearchValueArr(searchValueArr.concat(keyword));
        //   const keywordObj = document.getElementById('searchKey_keyword');
        //   keywordObj.setAttribute('show', 'off');
        // }
        // resetSearchValues();
        // searchInputRef.current.blur();
        // const keywordObj = document.getElementById('searchKey_location');
        // removeAllFocus();
        // keywordObj.setAttribute('focused', 'true');
        // showSearchKeywordItemList();
      }
    },
    [searchType, searchLocationArr, searchValueArr, searchKeyJsonArr]
  );

  const resetSearchValues = useCallback(() => {
    setSearchType('');
    searchInputRef.current.value = '';
  }, []);

  // 검색 키워드 리스트 보여주기
  const showSearchKeywordItemList = () => {
    const obj = document.getElementById('keyword_list');
    obj.setAttribute('show', 'on');
  };

  // 검색 키워드 리스트 숨기기
  const hideSearchKeywordItemList = () => {
    const obj = document.getElementById('keyword_list');
    obj.setAttribute('show', 'off');
  };

  // 검색 아이템 삭제 버튼 클릭 이벤트
  const onClickDeleteSearchItem = useCallback(
    e => {
      const obj = e.target;
      const parentObj = obj.parentNode;
      const value = parentObj.getAttribute('value');
      const type = parentObj.getAttribute('type');
      setSearchKeyJsonArr(searchKeyJsonArr.filter(jsonObj => jsonObj['searchValue'] !== value));
      setSearchLocationArr(searchLocationArr.filter(element => element !== value));
      setSearchValueArr(searchValueArr.filter(element => element !== value));

      if (type == 'location') {
        const keywordObj = document.getElementById('searchKey_location');
        keywordObj.setAttribute('show', 'on');
      } else if (type == 'keyword') {
        const keywordObj = document.getElementById('searchKey_keyword');
        keywordObj.setAttribute('show', 'on');
      }
    },
    [searchKeyJsonArr, searchLocationArr, searchValueArr]
  );

  // console.log('searchKeyJsonArr 9999999::: ', searchKeyJsonArr);

  // 검색 아이템 생성
  const getSearchItemDomList = useMemo(() => {
    let searchDataList = searchKeyJsonArr.concat();

    searchDataList = searchDataList.map((obj, idx) => {
      let text = '지역명 : ';
      if (obj['type'] == 'keyword') {
        text = '검색어 : ';
      }

      text += obj['searchValue'];

      return (
        <SearchItem className={'search_item'} key={idx} idx={idx} value={obj['searchValue']} type={obj['type']}>
          <SearchItemText>{text}</SearchItemText>
          <DeleteSearchItemIcon onClick={onClickDeleteSearchItem}>X</DeleteSearchItemIcon>
        </SearchItem>
      );
    });

    return searchDataList;
  }, [searchKeyJsonArr]);

  // 검색 아이콘 클릭 이벤트
  const onClickSearchIcon = useCallback(
    e => {
      // console.log('onClickSearchIcon searchKeyJsonArr ', searchKeyJsonArr);
      // console.log('onClickSearchIcon searchLocationArr ', searchLocationArr);
      // console.log('onClickSearchIcon searchValueArr ', searchValueArr);
      // console.log('onClickSearchIcon searchType ', searchType);

      let searchKeyword = '';
      searchValueArr.forEach(element => {
        searchKeyword += element + ' ';
      });
      searchKeyword = searchKeyword.trim();

      let searchLocation = '';
      // if (searchLocationArr.length != 0) {
      //   searchLocation = searchLocationArr[0];
      // }
      // else
      //   return;
      //여기서 인풋에 입력된 텍스트 정보를 가져올수 있나요? 어떻게요?
      searchLocation = searchInputRef.current.value;
      if (searchLocation.trim() == '') return;

      props.changePageNumber(1);
      const postData = { location: searchLocation, searchValue: searchKeyword };

      // console.log('onClickSearchIcon postData ', postData);
      searchInputRef.current.value = '';
      // console.log('props ::: ', props);
      handleSearchLocation(postData, categoryList);
    },
    [searchKeyJsonArr, searchLocationArr, searchValueArr, categoryList]
  );

  function handleSearchLocation(postData, categoryList) {
    // console.log('postData ::: ', postData);
    props.changeLocation(postData, categoryList);
    closeDetailSection();
  }

  function closeDetailSection() {
    props.showDetail(false);
  }

  // return (
  //   <SearchWrap>
  //     <SearchItemListWrap>{getSearchItemDomList}</SearchItemListWrap>
  //     <SearchKeyWrap id={'keyword_list'}>{getSearchKeyItemDomList}</SearchKeyWrap>
  //     <SearchKeywordInput ref={searchInputRef} onFocus={onFocusSearchInput} onKeyUp={onInputSearchInput} />
  //     <SearchIcon onClick={onClickSearchIcon}></SearchIcon>
  //     <CategoryWrap>{getCategoryDomList}</CategoryWrap>
  //   </SearchWrap>
  // );
  return (
    <SearchWrap>
      <SearchText>지역명</SearchText>
      <SearchKeywordInput ref={searchInputRef} onKeyUp={onInputSearchInput} />
      <SearchIcon onClick={onClickSearchIcon}></SearchIcon>
      <CategoryWrap>{getCategoryDomList}</CategoryWrap>
    </SearchWrap>
  );
});

SearchContainer.displayName = 'SearchContainer';
// export default SearchContainer;

// 검색 전체를 감싸고 있는 wrap div
const SearchWrap = styled.div`
  display: flex;
  width: 380px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 10;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 1px 3px 2px #9e9e9e;
  align-items: center;
`;

// 검색 키워드 감싸는 div
const SearchKeyWrap = styled.div`
  position: absolute;
  top: 60px;
  width: 30%;
  box-sizing: border-box;
  border: 1px solid #2f2f2f;
`;

// 검색 키워드 아이템 div
const SearchKeyItem = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  border-top: 1px solid #101010;
  &[focused='true'] {
    background-color: yellow;
  }
  &:hover {
    background-color: skyblue;
  }
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: block;
  }
  &:first-child {
    border-top: none;
  }
`;

// 지역명
const SearchText = styled.div`
  width: 60px;
  height: 30px;
  line-height: 30px;
  margin-right: 2px;
`;

// 검색 input
const SearchKeywordInput = styled.input`
  width: 320px;
  height: 30px;
  margin-right: 10px;
  border: 1px solid #101010;
  padding: 0px 10px;
  outline: none;
  border-radius: 5px;
`;

// 검색할 아이템을 감싸는 div
const SearchItemListWrap = styled.div`
  position: absolute;
  top: -30px;
  width: 100%;
  height: 20px;
  border: 1px solid #101010;
  border-radius: 5px;
  display: flex;
  align-items: center;
`;

// 검색할 아이템들 div
const SearchItem = styled.span`
  border: 1px solid brown;
  border-radius: 5px;
  margin: 0 5px;
  background-color: ${props => {
    switch (props.type) {
      case 'location':
        return 'lightcoral';

      case 'keyword':
        return 'aquamarine';
      default:
        return '#666666';
    }
  }};
`;

// 검색할 아이템 Text div
const SearchItemText = styled.span``;

// 삭제 아이콘
import { Close } from '@styled-icons/evaicons-solid/Close';
// 검색 아이콘
import { Search } from '@styled-icons/fa-solid';

// const DeleteSearchItemIcon = styled.span`
//   background-size: contain;
//   background-repeat: no-repeat;
//   background-position: center;
// }
// `;

// 검색할 아이템 삭제 아이콘
const DeleteSearchItemIcon = styled(Close)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
`;

// 검색 아이콘
const SearchIcon = styled(Search)`
  color: #949494;
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

// 카테고리 아이템을 감싸는 div
const CategoryWrap = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  &[show='off'] {
    display: none;
  }
  &[show='on'] {
    display: block;
  }
`;

// 카테고리 아이템 div
const Category = styled.div`
  display: inline-block;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
  font-size: 14px;
  padding: 0px 1px;
  background-color: ${props => {
    switch (props.type) {
      default:
        return '#666666';
    }
  }};
  color: ${props => {
    switch (props.type) {
      default:
        return '#ffffff';
    }
  }};
  &[isselected='true'] {
    background-color: ${props => {
      switch (props.type) {
        default:
          return '#222222';
      }
    }};
    color: ${props => {
      switch (props.type) {
        default:
          return '#ffffff';
      }
    }};
  }
`;

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

export default connect(
  mapStateToProps, // mapStateToProps: store와 props가 연결
  mapDispatchToProps // mapDispatchProps: action과 props가 연결
)(SearchContainer);
