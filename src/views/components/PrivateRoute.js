import React, { useContext } from 'react';
import { array, node, oneOfType, string, bool, func, element } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../components/App';

const propTypes = {
  component: oneOfType([array, node, string, func, element]),
  hasToken: bool,
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={props => {
        return user ? <Component {...props} /> : <Redirect to="/" />;
      }}
    />
  );
};

PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
