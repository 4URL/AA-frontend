import React, { Fragment, useEffect } from 'react';
import { defaultPlace } from '../../../../dummy/dummyData';

// const { kakao } = window;

const Map = () => {
  const maptStyle = {
    width: '100%',
    height: '100%'
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const { Latitude: dummyLat, Longitude: dummyLng } = defaultPlace;

    const mapOptions = {
      center: new window.kakao.maps.LatLng(dummyLat, dummyLng), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    const map = new window.kakao.maps.Map(container, mapOptions);
  }, []); // componentDidMount와 동일한 효과를 만들기 위해서 2번째 인자는 비웠음

  return (
    <Fragment>
      <h2>Map</h2>
      <div id="map" style={maptStyle}></div>
    </Fragment>
  );
};

export default Map;
