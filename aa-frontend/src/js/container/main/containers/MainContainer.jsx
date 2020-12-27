import React from 'react';

import NaverMap from './NaverMap';
import SearchBar from './SearchBar';
import PlaceDetailContainer from './PlaceDetailContainer';
import Popup from '../../popup/container/Popup';

const Main = () => {
  return (
    <>
      <NaverMap />
      <SearchBar />
      <PlaceDetailContainer />
      <Popup />
    </>
  );
};

export default Main;
