import React, { useContext } from 'react';
import { UserContext, AuthContext } from 'views/components/App';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
  Link,
  NavLink,
  useHistory,
} from 'react-router-dom';
import { logoutUser } from 'state/operations';

const Navigation = props => {
  const { user } = useContext(UserContext);
  const { auth, handleLogout } = useContext(AuthContext);
  const { current_user, expires, token } = auth;
  const history = useHistory();
  const is_anonymous = !current_user || !token || new Date(expires).getTime() <= Date.now();

  return (
    <nav>
      <ul>
        {is_anonymous ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <button type="button" onClick={() => logoutUser(auth, handleLogout, useHistory)}>
                Logout
              </button>
            </li>
            <li>
              <Link to={`/users/${current_user.id}`}>{current_user.username}'s Profile</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

Navigation.propTypes = {};

export default Navigation;
