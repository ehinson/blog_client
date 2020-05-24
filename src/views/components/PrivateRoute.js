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
  const { auth } = useContext(AuthContext);
  console.log(auth);

  return (
    <Route
      {...rest}
      render={props => {
        return auth.token ? (
          <Component {...props} />
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
