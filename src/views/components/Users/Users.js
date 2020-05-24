import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUsers } from '../../../state/operations';

import { UserContext, AuthContext, PostsContext } from '../../components/App';

const Users = props => {
  const { user, handleFetchUsers } = useContext(UserContext);
  const { auth, authDispatch } = useContext(AuthContext);

  //   let { user_id } = useParams();
  const history = useHistory();
  //   console.log(user, user_id);

  useEffect(() => {
    fetchUsers(auth, handleFetchUsers, history);
  }, [auth, handleFetchUsers, history]);

  return (
    <div>
      Users
      {user.users &&
        user.users.items.map(item => (
          <div>
            {item.username}
            <br />
            {item.about_me}
          </div>
        ))}
    </div>
  );
};

Users.propTypes = {};

export default Users;
