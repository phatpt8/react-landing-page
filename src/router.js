import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Home from './routes/Home';
import AdminArticles from './routes/Admin/Articles';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/admin" exact component={AdminArticles} />
        <Route path="/admin/articles" exact component={AdminArticles} />
        <Route path="/admin/articles/create" exact component={AdminArticles} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
