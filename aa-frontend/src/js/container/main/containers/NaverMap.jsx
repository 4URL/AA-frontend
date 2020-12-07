import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { faComments } from '@fortawesome/free-solid-svg-icons';

import { MapDiv } from '../views/StyledComponents';
import { searchPlaces } from '../js/api';

import { defaultPlace } from '../../../../dummy/dummyData';

const NaverMap = ({ location }) => {
  useEffect(() => {
    const results = searchPlaces(location);

    const mapOptions = {
      center: new window.naver.maps.LatLng(37.56835, 126.982252), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };

    // 아직 마커 여러개가 있을 때 어떻게 해야할지 못 정함
    // 지도 렌더링, 마커 렌더링 모두 위도, 경도 값만 있으면 됨
    // map에 들어갈 옵션은 center, level
    // marker에 들어갈 옵션(객체)은 position, map
    // 검색한 결과가 없으면 없다는 표시를 해줘야 함
    // => 웹에서는 왼쪽 영역에 검색한게 없다고 뜨고 지도에는 마커가 없어지고 지도는 그대로
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
  const { location } = state;
  console.log('location : ', location);
  return location;
};

export default connect(mapStateToProps)(NaverMap);
