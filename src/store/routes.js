import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../containers/app';
import BranchContainer from '../containers/branch';
import AboutPage from '../containers/about-page';
import CounterPage from '../containers/counter-page';

export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ CounterPage }/>
    <Route path="/branch" component={ BranchContainer }/>
    <Route path="/about" component={ AboutPage }/>
  </Route>
);
