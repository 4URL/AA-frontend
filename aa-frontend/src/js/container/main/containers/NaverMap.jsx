import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { showDetail, placeDetail, showList } from '../../../redux/actions/index';
import { getResultBounds } from '../../../utility/utility';

const NaverMap = props => {
  const { placesList: results, showList } = props.mapState;
  const [markerClicked, setMarkerClicked] = useState(false);

  useEffect(async () => {
    try {
      const resultLatLngBounds = getResultBounds(results);

      const mapOptions = {
        bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
      };

      let map = new window.naver.maps.Map('map', mapOptions);

      let markers = [];

      results.forEach((result, idx) => {
        const markerOption = {
          map,
          position: new window.naver.maps.LatLng(result.lat, result.lng), //지도의 중심좌표.
          title: idx
        };

        let marker = new window.naver.maps.Marker(markerOption);

        marker.addListener('click', e => clickMarker(e, results, marker));
        markers.push(marker);
      });
    } catch (e) {
      console.log(e);
    }
  }, [results]);

  function clickMarker(event, results, marker) {
    const place = results[event.overlay.title];
    console.log('place :: ', place);
    console.log('marker :: ', marker);
    showPlaceDetail(place);
  }

  function handelClick() {
    if (!markerClicked) props.showDetail(false);

    setMarkerClicked(false);
  }

  function showPlaceDetail(place) {
    props.showDetail(true);
    props.showList(false);
    props.placeDetail(place);
    setMarkerClicked(true);
  }

  return <MapDiv id="map" onClick={() => handelClick()} showList={showList} />;
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
  /* width: 100%; */
  width: ${({ showList }) => (showList ? 'calc(100% - 420px)' : '100%')};
  position: absolute;
  left: ${({ showList }) => (showList ? '420px' : '0')};
  height: 100%;
  z-index: 1;
`;
