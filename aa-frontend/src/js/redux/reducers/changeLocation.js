import { CHANGE_LOCATION } from '../actions/actionTypes';

const initialState = {
  location: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCATION: {
      const { searchedLocation } = action.payload;
      console.log('change location with redux!! new location is ', searchedLocation);
      location = searchedLocation;
      break;
      // return location;
    }

    default:
      return state;
  }
}
