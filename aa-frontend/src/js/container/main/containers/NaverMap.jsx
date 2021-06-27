import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { showDetail, placeDetail, showList, setShowAreaSearch, setDoAreaSearch } from '../../../redux/actions/index';
import { getResultBounds } from '../../../utility/utility';
import { fetchDisplayPlaces } from '../../../api/api';
import { FETCH_PLACES } from '../../../api/query';
import { makeMarker } from '../subcontainers/marker';

let markers = [];
let bDragging = false;
let map = null;

const NaverMap = props => {
  const { /* placesList: results, */ showList, /* showDetail, placeDetail, */ categoryList, searchData, doAreaSearch } = props.mapState;
  // const [markerClicked, setMarkerClicked] = useState(false);
  const [boundary, setBoundary] = useState({});

  const { loading, error, data } = useQuery(FETCH_PLACES, {
    variables: {
      categoryList,
      ne_lat: boundary.ne_lat,
      ne_lng: boundary.ne_lng,
      sw_lat: boundary.sw_lat,
      sw_lng: boundary.sw_lng
    }
  });

  // 첫 렌더링 시 유저 위치 파악
  useEffect(async () => {
    const mapOption = await getUserLocation();
    map = new window.naver.maps.Map('map', mapOption);

    naver.maps.Event.addListener(map, 'dragstart', function (e) {
      bDragging = true;
    });

    naver.maps.Event.addListener(map, 'dragend', function (e) {
      props.setShowAreaSearch(true);
      bDragging = false;
    });

    naver.maps.Event.addListener(map, 'bounds_changed', function (e) {
      if (!bDragging) props.setShowAreaSearch(true);
    });

    setBoundary({
      ...boundary,
      ne_lat: map.bounds._ne._lat,
      ne_lng: map.bounds._ne._lng,
      sw_lat: map.bounds._sw._lat,
      sw_lng: map.bounds._sw._lng
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      const results = data.search.stores;
      markers.forEach(marker => {
        marker.setMap(null);
      });

      markers = makeMarker(results, map);
    }
  }, [data]);

  useEffect(() => {
    if (searchData.location) {
      naver.maps.Service.geocode(
        {
          query: searchData.location
        },
        function (status, response) {
          if (status === naver.maps.Service.Status.ERROR) {
            console.log('Something Wrong!');
          }

          if (response.v2.meta.totalCount === 0) {
            console.log('totalCount' + response.v2.meta.totalCount);
          }

          if (!response.v2.addresses[0]) {
            alert('장소를 찾을 수 없습니다. (검색어 : ' + searchData.location + ')');
            return;
          }

          var item = response.v2.addresses[0];
          var point = new naver.maps.Point(item.x, item.y);
          map.setCenter(point);
        }
      );
      updateBoundary(map.bounds._ne, map.bounds._sw);
    }
  }, [searchData]);

  // Area Serach 버튼 동작 처리
  useEffect(() => {
    if (doAreaSearch && map) {
      props.setDoAreaSearch(false);
      setBoundary({
        ...boundary,
        ne_lat: map.bounds._ne._lat,
        ne_lng: map.bounds._ne._lng,
        sw_lat: map.bounds._sw._lat,
        sw_lng: map.bounds._sw._lng
      });
    }
  }, [doAreaSearch, map]);

  // list중에서 하나를 클릭하면 핀도 같이 반응 하기 위해 작성
  // useEffect(() => {
  //   if (showDetail) {
  //     markers.forEach(marker => {
  //       if (marker.title === placeDetail.name) marker.setIcon(icon.selected_icon);
  //     });
  //   } else {
  //     resetMarkers();
  //   }
  // }, [showDetail]);

  // marker를 클릭했을 때만 동작하는 함수
  // function clickMarker(results, marker) {
  //   // const seq = marker.get('seq');
  //   // const place = results[seq];

  //   resetMarkers();
  //   marker.setIcon(icon.selected_icon);
  //   // showPlaceDetail(place);
  // }

  // 지도 div에서 발생하는 click event handler
  // function handleClick() {
  //   if (!markerClicked) props.showDetail(false);
  //   resetMarkers();
  //   setMarkerClicked(false);
  // }

  // detail을 보여주기 위해 필요한 내용들을 정리한 함수
  // function showPlaceDetail(place) {
  //   props.showDetail(true);
  //   props.showList(true);
  //   props.placeDetail(place);
  //   setMarkerClicked(true);
  // }

  // 모든 marker들의 핀 이미지를 초기화 해주는 함수
  // function resetMarkers() {
  //   markers.forEach(marker => {
  //     marker.setIcon(icon.unselected_icon);
  //   });
  // }

  /**
   * 현재 위치를 지정해주는 함수
   * @param {naver map object} map
   */
  function getUserLocation() {
    let navigator = window.navigator;
    // Try HTML5 geolocation
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const options = {
              center: new window.naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
              zoom: 15
            };
            resolve(options);
          },
          error => {
            // error가 발생했을 때
            reject(error);
          },
          {
            // 옵션
            enableHighAccuracy: false, // 배터리를 사용해서 더 정확한 위치를 검색
            maximumAge: 0, // 한 번 찾은 위치를 몇소동안 캐생할 지
            timeout: Infinity // 주어진 초 안에 찾지 못하면 에러 발생
          }
        );
      });
    } else {
      // HTML5가 아니어서 geolocation을 사용할 수 없을 때
    }
  }

  return <MapDiv id="map" /* showList={showList} */ />;
};

const mapStateToProps = state => {
  return {
    mapState: {
      categoryList: state.mapReducers.categoryList,
      showList: state.mapReducers.showList,
      searchData: state.mapReducers.searchData,
      doAreaSearch: state.mapReducers.doAreaSearch
    }
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showDetail,
      placeDetail,
      showList,
      setShowAreaSearch,
      setDoAreaSearch
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NaverMap);

export const MapDiv = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
