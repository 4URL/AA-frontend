import { CHANGE_LOCATION } from './actionTypes';

export const changeLocation = searchedLocation => ({
  type: CHANGE_LOCATION,
  payload: {
    searchedLocation
  }
});
