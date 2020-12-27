import * as type from './actionTypes';

export const changeLocation = searchedLocation => ({
  type: type.CHANGE_LOCATION,
  payload: {
    searchedLocation
  }
});

export const clickMarker = clicked => ({
  type: type.MARKER_CLICKED,
  payload: {
    clicked
  }
});

export const getPlaces = placesList => ({
  type: type.GET_PLACES,
  payload: {
    placesList
  }
});

export const showList = showList => ({
  type: type.SHOW_LIST,
  payload: {
    showList
  }
});

export const showDetail = showDetail => ({
  type: type.SHOW_DETAIL,
  payload: {
    showDetail
  }
});

export const placeDetail = placeDetail => ({
  type: type.PLACE_DETAIL,
  payload: {
    placeDetail
  }
});
