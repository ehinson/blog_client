import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link } from 'react-router-dom';
import { fetchPost } from '../../../state/operations';

import { UserContext, AuthContext, PostsContext } from '../../components/App';

const Post = props => {
  const { posts, handleFetchPost } = useContext(PostsContext);
  const { auth, authDispatch } = useContext(AuthContext);

  let { id: user_id, post_id } = useParams();
  const history = useHistory();
  console.log(posts, user_id, post_id);

  useEffect(() => {
    fetchPost(auth, post_id, handleFetchPost, history);
  }, [auth, handleFetchPost, history, post_id]);

  return (
    <div>
      Post
      <br />
      <h5>{posts.post && posts.post.title}</h5>
      <br />
      <p>{posts.post && posts.post.body}</p>
      {auth.current_user.id === parseInt(user_id, 10) && (
        <Link to={`/users/${user_id}/posts/${post_id}/edit`}>Edit Post</Link>
      )}
    </div>
  );
};

Post.propTypes = {};

export default Post;
