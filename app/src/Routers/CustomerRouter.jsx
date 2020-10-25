import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Auth } from '../contexts';

export default({ component: Component, ...rest }) => {
  const AuthApi = React.useContext(Auth);
  
  return (
    <Route {...rest} render={props => (AuthApi.session.auth ?
      ( AuthApi.session.type === "customer" ? <Component {...props} /> : <Redirect to='/404' /> ):
      <Redirect to='/login' />)} />
  );
}

