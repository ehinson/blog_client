import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { fetchPost } from '../../../state/operations';

import { UserContext, AuthContext, PostsContext } from '../../components/App';

const Post = props => {
  const { posts, handleFetchPost } = useContext(PostsContext);
  const { auth, authDispatch } = useContext(AuthContext);

  let { id, post_id } = useParams();
  const history = useHistory();
  console.log(posts, id, post_id);

  useEffect(() => {
    fetchPost(auth, post_id, handleFetchPost, history);
  }, [auth, handleFetchPost, history, post_id]);

  return (
    <div>
      Post
      <br />
      {posts.post.title}
      <br />
      {posts.post.body}
    </div>
  );
};

Post.propTypes = {};

export default Post;
