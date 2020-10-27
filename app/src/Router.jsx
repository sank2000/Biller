import React from 'react';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import { Home, Login, BillHistory, CreateUser, CreateBill,Page404 , ShowBills, ShowUser} from "./pages";

import { AuthRouter, ProtectedRouter, OwnerRouter, AdminRouter, CustomerRouter } from "./Routers"

import Test from "./Test";

export default () => {
  return <> 
    <Router>
      <Switch>
        <ProtectedRouter path='/' exact component={Home} />
        <AuthRouter path='/login' exact component={Login} />

        <CustomerRouter path='/paybill' exact component={ShowBills} />
        <CustomerRouter path='/history' exact component={BillHistory} />

        <AdminRouter path='/createuser' exact component={CreateUser} />
        <AdminRouter path='/showuser' exact component={ShowUser} />

        <OwnerRouter path='/createbill' exact component={CreateBill} />
        <OwnerRouter path='/showbill' exact component={ShowBills} />

        <Route path="/test" component={Test} />
        
        <Route path="*" component={Page404} />
      </Switch>
    </Router>
  </>
  
}