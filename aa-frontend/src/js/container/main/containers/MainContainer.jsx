import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NaverMap from './NaverMap';
import SearchBar from './SearchBar';
import PlaceDetailContainer from './PlaceDetailContainer';

import Popup from '../../popup/container/Popup';

import PlaceList from './PlaceList';
import { getPlaces, showList } from '../../../redux/actions/index';
import { fetchPlaces } from '../../../api/api';

const Main = props => {
  const [curPage, setCurPage] = useState(1);
  const [total, setTotal] = useState(0);
  const { searchedLocation: location } = props.mapState;

  useEffect(async () => {
    try {
      const { stores, count } = await fetchPlaces(location, curPage);
      props.showList(true);
      props.getPlaces(stores);
      setTotal(count);
    } catch (e) {
      console.log(e);
    }
  }, [location, curPage]);

  return (
    <>
      <NaverMap />
      <SearchBar />
      <PlaceDetailContainer />
      <Popup />
      <PlaceList curPage={curPage} handleCurPage={setCurPage} count={total} />
    </>
  );
};

const mapStateToProps = state => {
  return {
    mapState: state.mapReducers
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getPlaces,
      showList
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
