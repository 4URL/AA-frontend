import React, { useEffect, useState } from 'react';

import NaverMap from './NaverMap';
// import SearchBar from './SearchBar';
import SearchBarContainer from '../../search/SearchBarContainer';
import AreaSearchButton from '../../areaSearch/AreaSearchButton';

const Main = () => {
  return (
    <>
      <NaverMap />
      <SearchBarContainer />
      <AreaSearchButton />
    </>
  );
};

export default Main;
