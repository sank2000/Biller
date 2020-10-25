import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';

import { Home, Login, PayBill, CreateUser, CreateBill,Page404 } from "./pages";

import {AuthRouter ,ProtectedRouter} from "./Routers"

export default () => {
  return <> 
    <Router>
      <Switch>
        <ProtectedRouter path='/' exact component={Home} />
        <AuthRouter path='/login' exact component={Login} />
        <ProtectedRouter path='/paybill' exact component={PayBill} />
        <ProtectedRouter path='/createuser' exact component={CreateUser} />
        <ProtectedRouter path='/createbill' exact component={CreateBill} />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  </>
  
}