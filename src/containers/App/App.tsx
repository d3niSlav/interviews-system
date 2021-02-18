import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import FormTest from './FormTest';
import Login from '../Auth/Login';
import Recover from '../Auth/Recover';
import Register from '../Auth/Register';
import Reset from '../Auth/Reset';
import ProtectedRoute from '../../components/ProtectedRoute';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
} from '../../shared/constants';

const App: FunctionComponent = () => {
  const isAuthenticated = false;

  return (
    <Switch>
      <Route path={LOGIN_ROUTE} component={Login} />
      <Route path={RECOVER_PASSWORD_ROUTE} component={Recover} />
      <Route path={REGISTER_ROUTE} component={Register} />
      <Route path={RESET_PASSWORD_ROUTE} component={Reset} />
      <ProtectedRoute
        authenticationPath={LOGIN_ROUTE}
        component={FormTest}
        exact
        isAuthenticated={isAuthenticated}
        path={HOME_ROUTE}
      />
      <Redirect from="*" to={HOME_ROUTE} />
    </Switch>
  );
};

export default App;
