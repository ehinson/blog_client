import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
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

  const { posts, user: pageUser } = user;
  const { current_user } = auth;
  console.log(pageUser);

  return (
    <div>
      User
      <br />
      {pageUser && pageUser.username}
      <div>Posts</div>
      <hr />
      <ul>
        {posts && posts.posts.items.length > 0 ? (
          posts.posts.items.map(item => (
            <li key={item.id}>
              <p>{item.title}</p>
              {current_user.id === parseInt(user_id, 10) && (
                <Link to={`/users/${user_id}/posts/${item.id}/edit`}>Edit Post</Link>
              )}
            </li>
          ))
        ) : (
          <p>
            No posts yet.{' '}
            {current_user.id === parseInt(user_id, 10) && (
              <Link to={`/users/${user_id}/posts/add`}>Add One</Link>
            )}
          </p>
        )}
      </ul>
    </div>
  );
};

User.propTypes = {};

export default User;
