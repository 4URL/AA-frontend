import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clickMarker } from '../../../redux/actions/index';
import { MapDiv } from '../views/StyledComponents';
import { searchPlaces } from '../../../api/api';
import { getResultBounds } from '../../../utility/utility';

const NaverMap = props => {
  const { location } = props;
  const [markerClicked, setMarkerClicked] = useState(false);
  let results = [];
  useEffect(() => {
    results = searchPlaces(location);
    const resultLatLngBounds = getResultBounds(results);

    const mapOptions = {
      bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
    };

    let map = new window.naver.maps.Map('map', mapOptions);

    let markers = [];

    results.forEach((result, idx) => {
      const markerOption = {
        map,
        position: new window.naver.maps.LatLng(result.Latitude, result.Longitude), //지도의 중심좌표.
        title: idx
      };

      let marker = new window.naver.maps.Marker(markerOption);

      marker.addListener('click', e => clickMarker(e));
      markers.push(marker);
    });
  }, [location, markerClicked]);

  // idx로 가져와야지
  function clickMarker(event) {
    const place = results[event.overlay.title];

    setMarkerClicked(!markerClicked);
    props.clickMarker(!markerClicked);

    console.log(place);
  }

  return <MapDiv id="map" />;
};

const mapStateToProps = state => {
  return {
    location: state.changeLocation.location
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clickMarker
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NaverMap);
