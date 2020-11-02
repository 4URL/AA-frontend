import React, { Component, Fragment } from 'react';

import LoginBox from './containers/LoginBox';
import LoginSideBox from './containers/LoginSideTab';

class LoginMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <LoginSideBox />
        <LoginBox />
      </Fragment>
    );
  }
}

export default LoginMain;
