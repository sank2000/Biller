import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { Auth } from '../contexts';

function RegisterRoute({ component: Component, ...rest }) {
  const AuthApi = React.useContext(Auth);
  return (
    <Route {...rest} render={props => (!AuthApi.session.auth ? <Component {...props} /> : <Redirect to='/' />)} />
  );
}

export default RegisterRoute;