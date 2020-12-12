import { CHANGE_LOCATION } from '../actions/actionTypes';

const initialState = {
  location: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION: {
      const { searchedLocation } = action.payload;
      return {
        location: searchedLocation
      };
    }

    default:
      return state;
  }
}
