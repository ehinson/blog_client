import React, { useContext } from 'react';
import PropTypes from 'prop-types';
let { topicId } = useParams();


import { UserContext, AuthContext, PostsContext } from '../../components/App';

const Post = props => {
  const { posts, postsDispatch } = useContext(PostsContext);
  return (
    <div>
      Post
      {posts[0].post.title}
      {posts[0].post.body}
    </div>
  );
};

Post.propTypes = {};

export default Post;
