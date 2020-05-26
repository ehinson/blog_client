import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPosts } from 'state/operations';

import { UserContext, AuthContext, PostsContext } from 'views/containers/App';

const Posts = props => {
  const { posts, handleFetchPosts } = useContext(PostsContext);
  const { auth, authDispatch } = useContext(AuthContext);

  let { id, post_id } = useParams();
  const history = useHistory();
  console.log(posts, id, post_id);

  useEffect(() => {
    fetchPosts(auth, post_id, handleFetchPosts, history);
  }, [auth, handleFetchPosts, history, post_id]);

  return (
    <div>
      Posts
      {posts.posts &&
        posts.posts.items.map(item => (
          <div>
            {item.title}
            <br />
            {item.body}
          </div>
        ))}
    </div>
  );
};

Posts.propTypes = {};

export default Posts;
