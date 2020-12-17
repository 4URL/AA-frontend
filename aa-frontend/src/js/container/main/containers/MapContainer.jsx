import React, { Fragment, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import NaverMap from './NaverMap';
import { getPlaces } from '../../../api/api';
import SearchBar from './SearchBar';

const Map = () => {
  const boxStyle = {
    width: '330px',
    height: '50px',
    position: 'absolute',
    left: '10px',
    top: '10px',
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '1px 3px 2px #9E9E9E'
  };

  const searchBox = {};

  const searchIcon = {};

  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);

  const handleSubmit = () => {
    console.log('button clicked');
    getPlaces(location);
  };

  const handleChange = event => {
    setLocation(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <NaverMap />
      <SearchBar />
    </>
  );
};

export default Map;
