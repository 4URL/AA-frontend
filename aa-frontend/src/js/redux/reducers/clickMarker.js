import { MARKER_CLICKED } from '../actions/actionTypes';

const initialState = {
  clicked: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MARKER_CLICKED: {
      const { clicked } = action.payload;
      return {
        clicked
      };
    }

    default:
      return state;
  }
}
