import React from 'react';
import { connect } from 'react-redux';

import { DetailInfoDiv } from '../views/StyledComponents';

const PlaceDetailContainer = props => <>{props.clicked ? <DetailInfoDiv /> : <></>}</>;

const mapStateToProps = state => {
  return {
    clicked: state.clickMarker.clicked
  };
};

export default connect(mapStateToProps)(PlaceDetailContainer);
