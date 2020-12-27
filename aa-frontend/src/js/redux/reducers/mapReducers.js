import * as type from '../actions/actionTypes';

const initialState = {
  // searchedLocation: '',
  searchData: { location: [], searchValue: '' },
  categoryList: [],
  showDetail: false,
  showList: false,
  placeDetail: {},
  placesList: []
};

export default function mapReducers(state = initialState, action) {
  switch (action.type) {
    case type.GET_PLACES: {
      const { placesList } = action.payload;
      return {
        ...state,
        placesList: [...placesList]
      };
    }

    case type.CHANGE_LOCATION: {
      // const { searchedLocation } = action.payload;
      const { searchData, categoryList } = action.payload;
      return {
        ...state,
        // searchedLocation
        searchData: { ...searchData },
        categoryList: [...categoryList]
      };
    }

    case type.SHOW_DETAIL: {
      const { showDetail } = action.payload;
      return {
        ...state,
        showDetail
      };
    }
    case type.SHOW_LIST: {
      const { showList } = action.payload;
      return {
        ...state,
        showList
      };
    }

    case type.PLACE_DETAIL: {
      const { placeDetail } = action.payload;
      return {
        ...state,
        placeDetail: { ...placeDetail }
      };
    }

    default:
      return state;
  }
}
