import React, { FunctionComponent } from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import FormTest from './FormTest';
import Login from '../Auth/Login';
import ProtectedRoute from '../../components/ProtectedRoute';
import Recover from '../Auth/Recover';
import Register from '../Auth/Register';

const App: FunctionComponent = () => {
  const isAuthenticated = false;

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/recover" component={Recover} />
      <Route path="/register" component={Register} />
      <ProtectedRoute
        authenticationPath="login"
        component={FormTest}
        exact
        isAuthenticated={isAuthenticated}
        path="/"
      />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default App;
