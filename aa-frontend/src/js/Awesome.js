import React, { Component, Fragment } from 'react';

import LoginMain from './container/login/LoginMain';

class Awesome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { isAutoLogin } = this.props;

    if (!isAutoLogin) {
      let storageLoginInfo = window.localStorage.getItem('isAutoLogin');

      if (storageLoginInfo != undefined && storageLoginInfo != null) {
        // isAutoLogin = storageLoginInfo;
        isAutoLogin = true;
      }
    }

    return (
      <Fragment>
        {!isAutoLogin && <LoginMain />}

        {/* <LoginMain /> */}
      </Fragment>
    );
  }
}

Awesome.propTypes = {
  isAutoLogin: Boolean
};

Awesome.defaultProps = {
  isAutoLogin: false
};

export default Awesome;
