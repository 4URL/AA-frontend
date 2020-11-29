import React, { Fragment, useEffect, useState } from 'react';
import { defaultPlace } from '../../../../dummy/dummyData';
import { searchPlaces } from '../js/api';

const Map = () => {
  const maptStyle = {
    width: '100%',
    height: '100%',
    zIndex: 1
  };

  const formStyle = {
    width: '230px',
    height: '30px',
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 10,
    backgroundColor: 'gray'
  };

  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);
  let map = null;

  useEffect(() => {
    const container = document.getElementById('map');
    const { Latitude: dummyLat, Longitude: dummyLng } = defaultPlace;

    const mapOptions = {
      center: new window.kakao.maps.LatLng(dummyLat, dummyLng), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    map = new window.kakao.maps.Map(container, mapOptions);

    const markerPosition = new window.kakao.maps.LatLng(37.5419644, 127.0385663);

    const marker = new window.kakao.maps.Marker({
      position: markerPosition
    });

    marker.setMap(map);
  }, []); // componentDidMount와 동일한 효과를 만들기 위해서 2번째 인자는 비웠음

  const handleSubmit = () => {
    console.log('button clicked');
    searchPlaces(location);
  };

  const handleChange = event => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  // form 사용하는거 찾아보기
  return (
    <Fragment>
      <h2>Map</h2>
      <div id="map" style={maptStyle}>
        <div style={formStyle}>
          <input placeholder="검색어를 입력해주세요." type="text" value={location} name="search" onChange={handleChange} />
          <button onClick={handleSubmit}>검색</button>
        </div>
      </div>
    </Fragment>
  );
};

export default Map;
