import React from 'react';
import { useQuery } from '@apollo/client';

import SearchBarView from './SearchBarView';

import { FETCH_CATEGORIES } from '../../api/query';

const SearchBarContainer = () => {
  const { loading, data } = useQuery(FETCH_CATEGORIES);

  return !loading && <SearchBarView categories={data.searchCategory} />;
};

export default SearchBarContainer;
