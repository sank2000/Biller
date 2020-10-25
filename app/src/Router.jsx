import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Home, Login, PayBill, CreateUser, CreateBill,Page404 , ShowBills} from "./pages";

import {AuthRouter ,ProtectedRouter,OwnerRouter ,AdminRouter ,CustomerRouter} from "./Routers"

export default () => {
  return <> 
    <Router>
      <Switch>
        <ProtectedRouter path='/' exact component={Home} />
        <AuthRouter path='/login' exact component={Login} />
        <CustomerRouter path='/paybill' exact component={PayBill} />
        <AdminRouter path='/createuser' exact component={CreateUser} />
        <OwnerRouter path='/createbill' exact component={CreateBill} />
        <OwnerRouter path='/showbill' exact component={ShowBills} />
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  </>
  
}