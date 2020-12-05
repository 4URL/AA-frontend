import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './js/container/main/containers/MainContainer';
import LoginMain from './js/container/login/LoginMain';
import SearchedMap from './js/container/main/containers/SearchedMap';
import NotFound from './js/NotFound';
import Awesome from './js/Awesome';

import { Provider } from 'react-redux';
import store from './js/redux/store/store';

import './css/Awesome.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/:input" component={SearchedMap} />
          <Route exact path="/login" component={LoginMain} />
          <Route component={NotFound} />
          <Redirect path="*" to="/" />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
