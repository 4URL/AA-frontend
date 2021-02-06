import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { showDetail, placeDetail, showList } from '../../../redux/actions/index';
import { getResultBounds, makeMarker } from '../../../utility/utility';
import { fetchDisplayPlaces } from '../../../api/api';

// todo : 이걸 따로 빼고 싶은데
const isMonitor = document.documentElement.clientWidth <= 768 ? true : false;
const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';
const ICON_STYLE = isMonitor ? 'width: 20px; height: 28px;' : 'width: 25px; height: 34px;';
const ANCHOR = { x: isMonitor ? 10 : 12, y: isMonitor ? 31 : 37 };

let markers = [];
let map;

const NaverMap = props => {
  const { placesList: results, showList, showDetail, placeDetail, categoryList, searchData } = props.mapState;
  const [markerClicked, setMarkerClicked] = useState(false);

  const selected_icon = {
    content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  };

  const unselected_icon = {
    content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  };

  // 첫 렌더링 시 유저 위치 파악
  useEffect(() => {
    map = new window.naver.maps.Map('map');
    getUserLocation(map);
  }, []);

  useEffect(async () => {
    try {
      // if there are results
      if (results.length > 0) {
        // todo: 결과물을 기준으로 bounds를 설정하는게 이제 의미가 없음
        // 검색된 결과를 기반으로 bounds를 설정
        /*
        const resultLatLngBounds = getResultBounds(results);

        const mapOptions = {
          bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
        };
        */

        markers = makeMarker(results, map, unselected_icon);
        markers.forEach(marker => {
          // todo: 이건 필요 없을 듯
          marker.addListener('click', () => clickMarker(results, marker));
        });

        // 지도 Drag 시, 새로운 장소 다시 검색
        naver.maps.Event.addListener(map, 'dragend', function (e) {
          searchOnMapMove(map);
        });
        naver.maps.Event.addListener(map, 'zoom_changed', function (e) {
          searchOnMapMove(map);
        });
        // 이 부분을 searchbar를 통해 수정
        ///////////////////////
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

            var item = response.v2.addresses[0],
              point = new naver.maps.Point(item.x, item.y);
            map.setCenter(point);
          }
        );
        ///////////////////////
      }
    } catch (e) {
      console.error(e);
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
          console.log('get user location');
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
