import * as type from './actionTypes';

export const changeLocation = (searchData, categoryList) => ({
  type: type.CHANGE_LOCATION,
  payload: {
    searchData,
    categoryList
  }
});

export const clickMarker = clicked => ({
  type: type.MARKER_CLICKED,
  payload: {
    clicked
  }
});

export const handleCategoryList = categoryList => ({
  type: type.HANDLE_CATEGORYLIST,
  payload: {
    categoryList
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

export const changePageNumber = curPage => ({
  type: type.CHANGE_PAGE_NUMBER,
  payload: {
    curPage
  }
});
