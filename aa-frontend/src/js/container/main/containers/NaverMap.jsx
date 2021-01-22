import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { showDetail, placeDetail, showList } from '../../../redux/actions/index';
import { getResultBounds } from '../../../utility/utility';

const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';
const ICON_STYLE = 'width: 25px; height: 34px;';

let markers = [];

const NaverMap = props => {
  const { placesList: results, showList, showDetail, placeDetail } = props.mapState;
  const [markerClicked, setMarkerClicked] = useState(false);

  const selected_icon = {
    content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(12, 37)
  };

  const unselected_icon = {
    content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(12, 37)
  };

  useEffect(async () => {
    try {
      // if there are results
      if (results.length > 0) {
        const resultLatLngBounds = getResultBounds(results);

        const mapOptions = {
          bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
        };

        let map = new window.naver.maps.Map('map', mapOptions);

        results.forEach((result, idx) => {
          const markerOption = {
            map,
            position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
            title: result.name,
            icon: unselected_icon
          };
          let marker = new window.naver.maps.Marker(markerOption);

          marker.addListener('click', () => clickMarker(results, marker));

          // marker.get('seq')를 통해서 idx값을 얻을 수 있음
          marker.set('seq', idx);
          markers.push(marker);
        });
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
  width: ${({ showList }) => (showList ? 'calc(100% - 420px)' : '100%')};
  position: absolute;
  left: ${({ showList }) => (showList ? '420px' : '0')};
  height: 100%;
  z-index: 1;
`;
