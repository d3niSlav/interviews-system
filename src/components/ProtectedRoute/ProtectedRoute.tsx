import React, { FunctionComponent } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string;
  isAllowed?: boolean;
  isAuthenticated: boolean;
  redirectedPath?: string;
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = ({
  authenticationPath,
  component,
  isAllowed = true,
  isAuthenticated = false,
  redirectedPath,
  ...rest
}) => {
  let redirectPath = '';
  if (!isAuthenticated) {
    redirectPath = authenticationPath;
  }

  if (redirectedPath && isAuthenticated && !isAllowed) {
    redirectPath = redirectedPath;
  }

  if (redirectPath) {
    const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
    return <Route {...rest} component={renderComponent} />;
  } else {
    return <Route {...rest} component={component} />;
  }
};

export default ProtectedRoute;
