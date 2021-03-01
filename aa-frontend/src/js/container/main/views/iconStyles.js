const RESTAURANT_SELECTED_MARKER = './restaurant_sel.png';
const RESTAURANT_UNSELECTED_MARKER = './restaurant_unsel.png';
const CAFE_SELECTED_MARKER = './cafe_sel.png';
const CAFE_UNSELECTED_MARKER = './cafe_unsel.png';
const ROOM_SELECTED_MARKER = './room_sel.png';
const ROOM_UNSELECTED_MARKER = './room_unsel.png';
const DOGHOUSE_SELECTED_MARKER = './doghouse_sel.png';
const DOGHOUSE_UNSELECTED_MARKER = './doghouse_unsel.png';
const PLAYGROUND_SELECTED_MARKER = './playground_sel.png';
const PLAYGROUND_UNSELECTED_MARKER = './playground_unsel.png';
const ETC_SELECTED_MARKER = './etc_sel.png';
const ETC_UNSELECTED_MARKER = './etc_unsel.png';

const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';

const isMonitor = document.documentElement.clientWidth <= 768 ? true : false;
const ICON_STYLE = isMonitor ? 'width: 26px; height: 30px;' : 'width: 30px; height: 34px;';
const ANCHOR = { x: isMonitor ? 13 : 15, y: isMonitor ? 30 : 34 };

export default {
  restaurant_selected_icon: {
    content: `<img src="${RESTAURANT_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  restaurant_unselected_icon: {
    content: `<img src="${RESTAURANT_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  cafe_selected_icon: {
    content: `<img src="${CAFE_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  cafe_unselected_icon: {
    content: `<img src="${CAFE_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  room_selected_icon: {
    content: `<img src="${ROOM_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  room_unselected_icon: {
    content: `<img src="${ROOM_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  doghouse_selected_icon: {
    content: `<img src="${DOGHOUSE_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  doghouse_unselected_icon: {
    content: `<img src="${DOGHOUSE_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  playground_selected_icon: {
    content: `<img src="${PLAYGROUND_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  playground_unselected_icon: {
    content: `<img src="${PLAYGROUND_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  etc_selected_icon: {
    content: `<img src="${ETC_SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  etc_unselected_icon: {
    content: `<img src="${ETC_UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },

  selected_icon: {
    content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  unselected_icon: {
    content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  }
};
