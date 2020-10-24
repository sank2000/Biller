import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home,Login } from "./pages";

export default () => {
  return <> 
    <Router>
      <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
      </Switch>
    </Router>
  </>
  
}