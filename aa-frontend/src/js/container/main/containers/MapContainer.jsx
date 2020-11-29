import React, { Fragment, useEffect, useState } from 'react';
import NaverMap from './NaverMap';
import { searchPlaces } from '../js/api';

const Map = () => {
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

  const handleSubmit = () => {
    console.log('button clicked');
    searchPlaces(location);
  };

  const handleChange = event => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  return (
    <Fragment>
      <NaverMap />
      <div style={formStyle}>
        <input placeholder="검색어를 입력해주세요." type="text" value={location} name="search" onChange={handleChange} />
        <button onClick={handleSubmit}>검색</button>
      </div>
    </Fragment>
  );
};

export default Map;
