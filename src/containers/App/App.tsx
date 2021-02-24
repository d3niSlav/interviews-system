import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import FormTest from './FormTest';
import {
  initializeUserAction,
  LoginPage,
  RecoverPage,
  RegisterPage,
  ResetPage,
  selectIsUserAuthenticated,
} from '../Auth';
import { NotFoundPage, ServiceUnavailablePage } from '../Errors';
import ProtectedRoute from '../../components/ProtectedRoute';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
  SERVICE_UNAVAILABLE_ROUTE,
} from '../../shared/constants';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(initializeUserAction());

  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  return (
    <>
      <Helmet>
        <title>Home | Expooze</title>
      </Helmet>
      <Switch>
        <Route path={LOGIN_ROUTE} component={LoginPage} />
        <Route path={NOT_FOUND_ROUTE} component={NotFoundPage} />
        <Route path={SERVICE_UNAVAILABLE_ROUTE} component={ServiceUnavailablePage} />
        <Route path={RECOVER_PASSWORD_ROUTE} component={RecoverPage} />
        <Route path={REGISTER_ROUTE} component={RegisterPage} />
        <Route path={RESET_PASSWORD_ROUTE} component={ResetPage} />
        <ProtectedRoute
          authenticationPath={LOGIN_ROUTE}
          component={FormTest}
          exact
          isAuthenticated={isAuthenticated}
          path={HOME_ROUTE}
        />
        <Redirect from="*" to={NOT_FOUND_ROUTE} />
      </Switch>
    </>
  );
};

export default App;
