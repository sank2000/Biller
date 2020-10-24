import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Home,Login,PayBill } from "./pages";

export default () => {
  return <> 
    <Router>
      <Switch>
          <Route path='/' exact component={Home} />
        <Route path='/login' exact component={Login} />
        <Route path='/paybill' exact component={PayBill} />
      </Switch>
    </Router>
  </>
  
}