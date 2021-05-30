import React, { useEffect, useState } from 'react';

import NaverMap from './NaverMap';
// import SearchBar from './SearchBar';
import SearchBarContainer from '../../search/SearchBarContainer';

const Main = () => {
  return (
    <>
      <NaverMap />
      <SearchBarContainer />
    </>
  );
};

export default Main;
