const SELECTED_MARKER = './marker_sel.png';
const UNSELECTED_MARKER = './marker_unsel.png';

const isMonitor = document.documentElement.clientWidth <= 768 ? true : false;
const ICON_STYLE = isMonitor ? 'width: 20px; height: 28px;' : 'width: 25px; height: 34px;';
const ANCHOR = { x: isMonitor ? 10 : 12, y: isMonitor ? 31 : 37 };

export default {
  selected_icon: {
    content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  },
  unselected_icon: {
    content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
    anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
  }
};

// const selected_icon = {
//   content: `<img src="${SELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
//   anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
// };

// const unselected_icon = {
//   content: `<img src="${UNSELECTED_MARKER}" style="${ICON_STYLE}" class="marker" />`,
//   anchor: new window.naver.maps.Point(ANCHOR.x, ANCHOR.y)
// };
