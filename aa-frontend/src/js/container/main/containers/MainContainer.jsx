import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NaverMap from './NaverMap';
// import SearchBar from './SearchBar';
import SearchContainer from '../../search/containers/SearchContainer';
import PlaceDetailContainer from './PlaceDetailContainer';

import Popup from '../../popup/container/Popup';

import PlaceList from './PlaceList';
import { getPlaces, showList } from '../../../redux/actions/index';
import { fetchPlaces } from '../../../api/api';

/*
  검색의 흐름
  첫 장소는 현재 위치를 잡는다. 
  거기를 기준으로 북동, 남서를 넘긴다. 거기를 보여준다.
  옮기면 새로운 기준을 보내주고 보여준다

  지금 있는 컴포넌트
   - MainContainer : 굳이 렌더링될 필요가 없음 당장은
    - Navermap : 지도를 옮기거나 줌인, 줌아웃을 하면 새로운 마커가 생긴다 => 그 때 다시 렌더링
    - SearchContainer : 장소 검색을 입력하거나 카테고리를 클릭하면 상태가 변하고 그 때만 다시 렌더링 된다
*/

const Main = () => {
  // const [curPage, setCurPage] = useState(1);

  // const [total, setTotal] = useState(0);
  // const { searchedLocation: location } = props.mapState;
  // const { searchData, categoryList, curPage } = props.mapState;

  // useEffect(async () => {
  //   try {
  //     const { stores, count } = await fetchPlaces(searchData, categoryList, curPage);
  //     // console.log('stores :: ', stores);
  //     props.showList(true);
  //     props.getPlaces(stores);
  //     setTotal(count);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [searchData, curPage]);

  return (
    <>
      <NaverMap />
      <SearchContainer />
      {/* <PlaceDetailContainer /> */}
      {/* <Popup /> */}
      {/* <PlaceList curPage={curPage} handleCurPage={setCurPage} count={total} /> */}
      {/* <PlaceList curPage={curPage} count={total} /> */}
    </>
  );
};

// const mapStateToProps = state => {
//   return {
//     mapState: state.mapReducers
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators(
//     {
//       getPlaces,
//       showList
//     },
//     dispatch
//   );
// };

export default Main;
