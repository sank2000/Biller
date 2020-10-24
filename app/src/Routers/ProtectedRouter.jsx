import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Auth } from '../contexts';

function ProtectedRoute({ component: Component, ...rest }) {
  const AuthApi = React.useContext(Auth);
  return (
    <Route {...rest} render={props => (AuthApi.data.auth ? <Component {...props} /> : <Redirect to='/login' />)} />
  );
}

export default ProtectedRoute;