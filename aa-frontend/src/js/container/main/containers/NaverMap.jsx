import React, { useEffect } from 'react';
import { defaultPlace } from '../../../../dummy/dummyData';

let map = null;

const NaverMap = () => {
  const maptStyle = {
    width: '100%',
    height: '100%',
    zIndex: 1
  };

  useEffect(() => {
    const { Latitude: dummyLat, Longitude: dummyLng } = defaultPlace;

    const mapOptions = {
      center: new window.naver.maps.LatLng(dummyLat, dummyLng), //지도의 중심좌표.
      level: 5 //지도의 레벨(확대, 축소 정도)
    };

    map = new window.naver.maps.Map('map', mapOptions);
  });

  return <div id="map" style={maptStyle} />;
};

export default NaverMap;
