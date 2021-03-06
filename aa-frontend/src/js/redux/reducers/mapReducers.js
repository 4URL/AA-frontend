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
  showAreaSearch: false,
  doAreaSearch: false
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

    case type.SHOW_AREA_SEARCH: {
      const showArea = action.payload;
      return {
        ...state,
        showAreaSearch: showArea
      };
    }

    case type.DO_AREA_SEARCH: {
      const doArea = action.payload;
      return {
        ...state,
        doAreaSearch: doArea
      };
    }

    default:
      return state;
  }
}
