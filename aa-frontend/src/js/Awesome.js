import React, { Component, Fragment } from 'react';

import LoginMain from './container/login/LoginMain';

class Awesome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { isAutoLogin } = this.props;

    console.log('isAutoLogin 11111 ::: ', isAutoLogin);

    if (!isAutoLogin) {
      let storageLoginInfo = window.localStorage.getItem('isAutoLogin');

      console.log('storageLoginInfo ::: ', storageLoginInfo);

      if (storageLoginInfo != undefined && storageLoginInfo != null) {
        // isAutoLogin = storageLoginInfo;
        isAutoLogin = true;
      }
    }

    console.log('isAutoLogin 22222 ::: ', isAutoLogin);

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
