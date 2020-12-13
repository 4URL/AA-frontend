import { combineReducers } from 'redux';
import changeLocation from './changeLocation';
import clickMarker from './clickMarker';

export default combineReducers({
  changeLocation,
  clickMarker
});
