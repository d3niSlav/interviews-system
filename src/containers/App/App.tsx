import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { initializeUserAction, LoginPage, RecoverPage, RegisterPage, ResetPage } from '../Auth';
import { NotFoundPage, ServiceUnavailablePage } from '../Errors';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  NOT_FOUND_ROUTE,
  RECOVER_PASSWORD_ROUTE,
  REGISTER_ROUTE,
  RESET_PASSWORD_ROUTE,
  SERVICE_UNAVAILABLE_ROUTE,
} from '../../shared/constants';
import Layout from './Layout';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  dispatch(initializeUserAction());

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
        <Route path={HOME_ROUTE} component={Layout} />
        <Redirect from="*" to={NOT_FOUND_ROUTE} />
      </Switch>
    </>
  );
};

export default App;
