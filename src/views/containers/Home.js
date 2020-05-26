import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import { fetchUser, fetchUserPosts } from 'state/operations';

import { UserContext, PostsContext } from 'views/components/App';

const Home = props => {
  const { auth } = props;
  const { handleFetchUserPosts } = useContext(PostsContext);
  const {
    user: { posts },
  } = useContext(UserContext);
  const user = auth.current_user;
  let { id: user_id } = user;
  const history = useHistory();
  console.log('user', user_id, auth.current_user, posts);

  useEffect(() => {
    fetchUserPosts(auth, user_id, handleFetchUserPosts);
  }, [auth, history, user_id, handleFetchUserPosts]);

  const username = user && user.username;

  return (
    <div>
      <header>
        <h2> Welcome Home {username}</h2>
      </header>

      <br />
      <p>{username}'s Posts</p>
      <hr />
      <ul>
        {posts && posts.posts.items.length > 0 ? (
          posts.posts.items.map(item => (
            <li key={item.id}>
              <h5>{item.title}</h5>
              <p>{item.body}</p>
              <Link to={`/posts/${item.id}/edit`}>Edit Post</Link>
            </li>
          ))
        ) : (
          <p>
            No posts yet. <Link to={`/users/${user_id}/posts/add`}>Add One</Link>
          </p>
        )}
      </ul>
    </div>
  );
};

Home.propTypes = {};

export default Home;
