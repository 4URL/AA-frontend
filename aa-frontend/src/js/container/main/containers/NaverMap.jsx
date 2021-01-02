import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { showDetail, placeDetail, showList } from '../../../redux/actions/index';
import { getResultBounds } from '../../../utility/utility';

const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';

const NaverMap = props => {
  const { placesList: results, showList } = props.mapState;
  const [markerClicked, setMarkerClicked] = useState(false);

  const selected_icon = {
    url: SELECTED_MARKER,
    scaledSize: new window.naver.maps.Size(25, 34)
  };

  const unselected_icon = {
    url: UNSELECTED_MARKER,
    scaledSize: new window.naver.maps.Size(25, 34)
  };

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
          title: idx,
          icon: unselected_icon
        };
        let marker = new window.naver.maps.Marker(markerOption);

        marker.addListener('click', e => clickMarker(e, results, marker));
        // marker.addListener('mouseover', e => mouseOver(e, marker));
        // marker.addListener('mouseout', e => mouseOut(e, marker));
        marker.set('seq', result.name);
        markers.push(marker);
      });
    } catch (e) {
      console.log(e);
    }
  }, [results]);

  function clickMarker(event, results, marker) {
    const place = results[event.overlay.title];
    // const m = event.overlay;
    // const seq = m.get('seq');
    // console.log(seq);

    marker.setIcon(selected_icon);
    showPlaceDetail(place);
  }

  function mouseOver(e, marker) {
    marker.setIcon(selected_icon);
  }

  function mouseOut(e, marker) {
    marker.setIcon(unselected_icon);
  }

  function handleClick() {
    if (!markerClicked) props.showDetail(false);

    setMarkerClicked(false);
  }

  function showPlaceDetail(place) {
    props.showDetail(true);
    props.showList(true);
    props.placeDetail(place);
    setMarkerClicked(true);
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
  /* width: 100%; */
  width: ${({ showList }) => (showList ? 'calc(100% - 420px)' : '100%')};
  position: absolute;
  left: ${({ showList }) => (showList ? '420px' : '0')};
  height: 100%;
  z-index: 1;
`;
