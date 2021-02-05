import React, { Component, Fragment } from 'react';

import LoginContainer from './containers/LoginContainer';
import LoginSideBox from './containers/LoginSideTab';
import SignupContainer from './containers/SignupContainer';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// const SignupContainer = require('./containers/SignupContainer');

class LoginMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <LoginSideBox />
        {/* <LoginContainer /> */}
        {/* <SignupContainer /> */}
        <Router>
          <Switch>
            <Route exact path="/" component={LoginContainer}></Route>
            <Route path="/signup" component={SignupContainer}></Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default LoginMain;
