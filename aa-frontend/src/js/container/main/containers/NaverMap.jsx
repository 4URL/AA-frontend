import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';

import { showDetail, placeDetail, showList } from '../../../redux/actions/index';
import { getResultBounds, makeMarker } from '../../../utility/utility';
import { fetchDisplayPlaces } from '../../../api/api';
import { FETCH_PLACES } from '../../../api/query';

// todo : 이걸 따로 빼고 싶은데
const isMonitor = document.documentElement.clientWidth <= 768 ? true : false;
const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';
const ICON_STYLE = isMonitor ? 'width: 20px; height: 28px;' : 'width: 25px; height: 34px;';
const ANCHOR = { x: isMonitor ? 10 : 12, y: isMonitor ? 31 : 37 };

let markers = [];
let bDragging = false;
let map = null;
let results = null;

/*
  @ Navermap
  ! 관련된 상태 : boundary만 rendering에 관여
  * logic
  1. 첫 렌더링에서 사용자 위치를 기준으로 boundary를 잡는다 / useEffect 사용
    이를 기준으로 useQuery를 보낸다(아마 첫 렌더링시 동작하지 않는 건, 처음에 0, 0으로 전달되기 때문으로 추측)
  2. 줌 이벤트, 드래그 이벤트를 하면 boundary가 변경되고 다시 렌더링이 작동한다

  todo: 첫 렌더링 시 핀이 안뜬다...
*/
const NaverMap = props => {
  const { /* placesList: results, */ showList, showDetail, placeDetail, categoryList } = props.mapState;
  const [markerClicked, setMarkerClicked] = useState(false);
  const [boundary, setBoundary] = useState({});

  // 첫 렌더링 시 유저 위치 파악
  useEffect(() => {
    console.log('initial useEffect');
    map = new window.naver.maps.Map('map');
    getUserLocation(map);
    updateBoundary(map.bounds._ne, map.bounds._sw);
    // searchOnMapMove(map);
  }, []);

  const { loading, error, data } = useQuery(FETCH_PLACES, {
    variables: {
      categoryList,
      ne_lat: boundary.ne_lat,
      ne_lng: boundary.ne_lng,
      sw_lat: boundary.sw_lat,
      sw_lng: boundary.sw_lng
    }
  });

  if (!loading) {
    results = data.search.stores;
  }

  const selected_icon = {
    content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  };

  const unselected_icon = {
    content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  };

  useEffect(() => {
    // if there are results
    if (results && results.length > 0) {
      // const resultLatLngBounds = getResultBounds(results);

      // const mapOptions = {
      //   bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
      // };

      // if (!map) map = new window.naver.maps.Map('map', mapOptions);

      markers.forEach(marker => {
        marker.setMap(null);
      });
      // MainContainer에서 useEffect를 주석하면 안뜨는 이유는 makeMarker가 redux에서 가져오는데
      // 지금은 results가 비어 있어서 마커를 만들수가 없는 것
      // 이걸 redux가 아니라 apollo client를 사용하면 요청하고 가져온 값을 기준으로 보여줄 듯
      console.log('results :: ', results);
      // console.log(typeof results[0].lat);
      markers = makeMarker(results, map, unselected_icon);
      markers.forEach(marker => {
        marker.addListener('click', () => clickMarker(results, marker));
      });

      // 지도 Drag 시, 새로운 장소 다시 검색
      naver.maps.Event.clearListeners(map, 'dragstart');
      naver.maps.Event.clearListeners(map, 'dragend');
      naver.maps.Event.clearListeners(map, 'bounds_changed');
      naver.maps.Event.addListener(map, 'dragstart', function (e) {
        bDragging = true;
      });
      naver.maps.Event.addListener(map, 'dragend', function (e) {
        searchOnMapMove(map);
        bDragging = false;
      });
      naver.maps.Event.addListener(map, 'bounds_changed', function (e) {
        if (!bDragging) searchOnMapMove(map);
      });

      ///////////////////////
      // naver.maps.Service.geocode(
      //   {
      //     query: '부산'
      //   },
      //   function (status, response) {
      //     if (status === naver.maps.Service.Status.ERROR) {
      //       console.log('Something Wrong!');
      //     }

      //     if (response.v2.meta.totalCount === 0) {
      //       console.log('totalCount' + response.v2.meta.totalCount);
      //     }

      //     var item = response.v2.addresses[0],
      //       point = new naver.maps.Point(item.x, item.y);
      //     map.setCenter(point);
      //   }
      // );
      ///////////////////////
    }
  }, [results]);

  // list중에서 하나를 클릭하면 핀도 같이 반응 하기 위해 작성
  useEffect(() => {
    // (showDetail === true && redux state place === clicked marker's place) ==> pin react
    if (showDetail) {
      markers.forEach(marker => {
        if (marker.title === placeDetail.name) marker.setIcon(selected_icon);
      });
    } else {
      resetMarkers();
    }
  }, [showDetail]);

  // marker를 클릭했을 때만 동작하는 함수
  function clickMarker(results, marker) {
    const seq = marker.get('seq');
    const place = results[seq];

    resetMarkers();
    marker.setIcon(selected_icon);
    showPlaceDetail(place);
  }

  // 지도 div에서 발생하는 click event handler
  function handleClick() {
    if (!markerClicked) props.showDetail(false);
    resetMarkers();
    setMarkerClicked(false);
  }

  // detail을 보여주기 위해 필요한 내용들을 정리한 함수
  function showPlaceDetail(place) {
    props.showDetail(true);
    props.showList(true);
    props.placeDetail(place);
    setMarkerClicked(true);
  }

  // 모든 marker들의 핀 이미지를 초기화 해주는 함수
  function resetMarkers() {
    markers.forEach(marker => {
      marker.setIcon(unselected_icon);
    });
  }

  function searchOnMapMove(map) {
    var promise = fetchDisplayPlaces(categoryList, map.bounds._ne, map.bounds._sw);
    promise.then(value => {
      for (var i = 0; i < markers.length; i++) markers[i].setMap(null);
      markers = makeMarker(value.stores, map, unselected_icon);
      markers.forEach(marker => {
        marker.addListener('click', () => clickMarker(value.stores, marker));
      });
    });
  }

  /**
   * 현재 위치를 지정해주는 함수
   * @param {naver map object} map
   */
  function getUserLocation(map) {
    let navigator = window.navigator;
    // Try HTML5 geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const options = {
            center: new window.naver.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 15
          };
          map.setOptions(options);
        },
        error => {
          // error가 발생했을 때
          console.error(error);
        },
        {
          // 옵션
          enableHighAccuracy: false, // 배터리를 사용해서 더 정확한 위치를 검색
          maximumAge: 0, // 한 번 찾은 위치를 몇소동안 캐생할 지
          timeout: Infinity // 주어진 초 안에 찾지 못하면 에러 발생
        }
      );
    } else {
      // HTML5가 아니어서 geolocation을 사용할 수 없을 때
    }
  }

  function updateBoundary(ne, sw) {
    setBoundary({
      ...boundary,
      ne_lat: ne._lat,
      ne_lng: ne._lng,
      sw_lat: sw._lat,
      sw_lng: sw._lng
    });
  }

  return <MapDiv id="map" onClick={() => handleClick()} showList={showList} />;
};

const mapStateToProps = state => {
  return {
    mapState: state.mapReducers
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      showDetail,
      placeDetail,
      showList
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
