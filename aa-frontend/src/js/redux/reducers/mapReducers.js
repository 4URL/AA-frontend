import * as type from '../actions/actionTypes';

const initialState = {
  // searchedLocation: '',
  searchData: { location: '', searchValue: '' },
  categoryList: [],
  showDetail: false,
  showList: false,
  placeDetail: {},
  placesList: [],
  curPage: 1,
  curMapBound: { ne_lat: 0, ne_lng: 0, sw_lat: 0, sw_lng: 0 },
  showAreaSearch: false
};

export default function mapReducers(state = initialState, action) {
  switch (action.type) {
    case type.HANDLE_CATEGORYLIST: {
      const { categoryList } = action.payload;
      return {
        ...state,
        categoryList: [...categoryList]
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
      if (showDetail) {
        return {
          ...state,
          showDetail
        };
      } else {
        return {
          ...state,
          showDetail,
          placeDetail: {}
        };
      }
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

    case type.CHANGE_PAGE_NUMBER: {
      const { curPage } = action.payload;
      return {
        ...state,
        curPage: curPage
      };
    }

    case type.CHANGE_BOUND: {
      const { curMapBound } = action.payload;
      if (
        state.curMapBound.ne_lat === curMapBound.ne_lat &&
        state.curMapBound.ne_lng === curMapBound.ne_lng &&
        state.curMapBound.sw_lat === curMapBound.sw_lat &&
        state.curMapBound.sw_lng === curMapBound.sw_lng
      )
        return state;
      else
        return {
          ...state,
          curMapBound: { ...curMapBound }
        };
    }

    case type.SHOW_AREA_SEARCH: {
      const showArea = action.payload;
      return {
        ...state,
        showAreaSearch: showArea
      };
    }

    default:
      return state;
  }
}
