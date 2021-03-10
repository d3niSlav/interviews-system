import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import FormTest from '../FormTest';
import TableView from '../TableView';
import { selectIsUserAuthenticated } from '../../Auth';
import Categories from '../../Categories';
import ProtectedRoute from '../../../components/ProtectedRoute';
import { HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE } from '../../../shared/constants';
import Navigation from '../../../components/Navigation';

import styles from './Layout.module.scss';

const Layout: FunctionComponent = () => {
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  return (
    <>
      <Navigation />
      <main className={styles.pageContent}>
        <Switch>
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={FormTest}
            exact
            isAuthenticated={isAuthenticated}
            path={HOME_ROUTE}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={TableView}
            exact
            isAuthenticated={isAuthenticated}
            path={'/table-list'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Categories}
            exact
            isAuthenticated={isAuthenticated}
            path={'/questions/categories'}
          />
          <Redirect from="*" to={NOT_FOUND_ROUTE} />
        </Switch>
      </main>
    </>
  );
};

export default Layout;
