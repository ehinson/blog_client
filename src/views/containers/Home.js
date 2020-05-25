import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
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
      Welcome Home {username}
      <br />
      <div> {username}'s Posts</div>
      <hr />
      {posts &&
        posts.posts.items &&
        posts.posts.items.map(item => <div key={item.id}>{item.title}</div>)}
    </div>
  );
};

Home.propTypes = {};

export default Home;
