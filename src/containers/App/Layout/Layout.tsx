import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import FormTest from '../FormTest';
import { selectIsUserAuthenticated } from '../../Auth';
import Dashboard from '../../Dashboard';
import Categories from '../../Categories';
import { Candidates } from '../../Candidates';
import CandidateProfile from '../../Candidates/components/CandidateProfile';
import CreateCandidate from '../../Candidates/components/CreateCandidate';
import { Employees } from '../../Employees';
import { InterviewProcess, Interviews } from '../../Interviews';
import { JobPositions } from '../../JobPositions';
import { JobTitles } from '../../JobTitles';
import { Questions } from '../../Questions';
import { Subjects } from '../../Subjects';
import { Tags } from '../../Tags';
import { Topics } from '../../Topics';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Navigation from '../../../components/Navigation';
import { HOME_ROUTE, LOGIN_ROUTE, NOT_FOUND_ROUTE } from '../../../shared/constants';

import styles from './Layout.module.scss';

const Layout: FunctionComponent = () => {
  const isAuthenticated = useSelector(selectIsUserAuthenticated);

  return (
    <>
      <Navigation />
      <main className={styles.pageContent}>
        <Switch>
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={Dashboard}
            exact
            // isAuthenticated={isAuthenticated}
            path={HOME_ROUTE}
          />
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={Candidates}
            exact
            // isAuthenticated={isAuthenticated}
            path={'/candidates'}
          />
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={CreateCandidate}
            exact
            // isAuthenticated={isAuthenticated}
            path={'/candidates/create'}
          />
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={CandidateProfile}
            exact
            // isAuthenticated={isAuthenticated}
            path={'/candidates/profile/:id'}
          />
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={FormTest}
            exact
            // isAuthenticated={isAuthenticated}
            path={HOME_ROUTE}
          />
          <Route
            // authenticationPath={LOGIN_ROUTE}
            component={Employees}
            exact
            // isAuthenticated={isAuthenticated}
            path={'/employees'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Categories}
            exact
            isAuthenticated={isAuthenticated}
            path={'/questions/categories'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Interviews}
            exact
            isAuthenticated={true}
            path={'/interviews/list'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={JobPositions}
            exact
            isAuthenticated={true}
            path={'/job-positions'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={InterviewProcess}
            exact
            isAuthenticated={true}
            path={'/interviews/process'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={JobTitles}
            exact
            isAuthenticated={true}
            path={'/settings/job-titles'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Subjects}
            exact
            isAuthenticated={true}
            path={'/settings/subjects'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Topics}
            exact
            isAuthenticated={true}
            path={'/settings/topics'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Questions}
            exact
            isAuthenticated={true}
            path={'/settings/questions'}
          />
          <ProtectedRoute
            authenticationPath={LOGIN_ROUTE}
            component={Tags}
            exact
            isAuthenticated={true}
            path={'/settings/tags'}
          />
          <Redirect from="*" to={NOT_FOUND_ROUTE} />
        </Switch>
      </main>
    </>
  );
};

export default Layout;
