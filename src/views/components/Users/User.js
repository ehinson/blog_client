import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { fetchUser, fetchUserPosts } from '../../../state/operations';

import { UserContext, AuthContext, PostsContext } from '../../components/App';

const User = props => {
  const { user, handleFetchUser } = useContext(UserContext);
  const { auth } = useContext(AuthContext);
  const { handleFetchUserPosts } = useContext(PostsContext);

  let { id: user_id } = useParams();
  const history = useHistory();
  console.log('user', user_id, user);

  useEffect(() => {
    fetchUser(auth, user_id, handleFetchUser, history);
    fetchUserPosts(auth, user_id, handleFetchUserPosts);
  }, [auth, handleFetchUser, history, user_id, handleFetchUserPosts]);

  return (
    <div>
      User
      <br />
      {user && user.user && user.user.username}
      <div>Posts</div>
      <hr />
      {user &&
        user.posts &&
        user.posts.posts.items.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};

User.propTypes = {};

export default User;
