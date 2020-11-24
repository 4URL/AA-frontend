import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Main from './js/container/main/containers/MainContainer';
import LoginMain from './js/container/login/LoginMain';
import NotFound from './js/NotFound';
import Awesome from './js/Awesome';
import './css/Awesome.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={LoginMain} />
        <Route component={NotFound} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
