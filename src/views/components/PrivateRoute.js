import React, { useContext } from 'react';
import { array, node, oneOfType, string, bool, func, element } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { UserContext, AuthContext } from '../components/App';

const propTypes = {
  component: oneOfType([array, node, string, func, element]),
  hasToken: bool,
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);
  const { auth: { current_user, token, expires } } = useContext(AuthContext);
  const is_anonymous = !current_user || !token || new Date(expires).getTime() <= Date.now();

  return (
    <Route
      {...rest}
      render={props => {
        return !is_anonymous ? (
          <Component is_anonymous={is_anonymous} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
