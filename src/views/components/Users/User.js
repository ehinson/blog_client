import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUser } from '../../../state/operations';

import { UserContext, AuthContext, PostsContext } from '../../components/App';

const User = props => {
  const { user, handleFetchUser } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);

  let { id: user_id } = useParams();
  const history = useHistory();
  console.log('user', user_id, user);

  useEffect(() => {
    fetchUser(auth, user_id, handleFetchUser, history);
  }, [auth, handleFetchUser, history, user_id]);

  return (
    <div>
      User
      <br />
      {user && user.user && user.user.username}
    </div>
  );
};

User.propTypes = {};

export default User;
