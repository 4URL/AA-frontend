import { CHANGE_LOCATION, MARKER_CLICKED } from './actionTypes';

export const changeLocation = searchedLocation => ({
  type: CHANGE_LOCATION,
  payload: {
    searchedLocation
  }
});

export const clickMarker = clicked => ({
  type: MARKER_CLICKED,
  payload: {
    clicked
  }
});
