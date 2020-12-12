import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { MapDiv } from '../views/StyledComponents';
import { searchPlaces } from '../../../api/api';
import { getResultBounds } from '../../../utility/utility';

import { defaultPlace } from '../../../../dummy/dummyData';

const NaverMap = props => {
  const { location } = props;

  useEffect(() => {
    const results = searchPlaces(location);
    const resultLatLngBounds = getResultBounds(results);

    const mapOptions = {
      bounds: resultLatLngBounds // Lat,Lng 기준으로 바운드 설정 (cf. 이 옵션에 의해 Zoom, Center 옵션은 무시됨)
    };

    let map = new window.naver.maps.Map('map', mapOptions);

    let markers = [];
    results.forEach(result => {
      let marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(result.Latitude, result.Longitude), //지도의 중심좌표.
        map
      });
      markers.push(marker);
    });
  }, [location]);

  return <MapDiv id="map" />;
};

const mapStateToProps = state => {
  return {
    location: state.changeLocation.location
  };
};

export default connect(mapStateToProps)(NaverMap);
