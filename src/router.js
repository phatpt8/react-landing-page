import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Home from './routes/Home';
import AdminHome from './routes/Admin/Home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={AdminHome} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;