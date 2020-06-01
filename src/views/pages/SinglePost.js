import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useAxios } from 'state/hooks/useAxios';
import { UserContext, AuthContext, PostsContext } from 'views/components/App';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import Dangerous from '../components/Dangerous';

const SinglePost = props => {
  const { post_id } = useParams();
  const history = useHistory();
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  const { response: getPostResponse, request: getPost } = useAxios({
    method: 'get',
    url: `/posts/${post_id}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getPostResponse.status === 0) {
        await getPost();
      }
    };

    fetchData();
  }, [getPost, getPostResponse]);
  console.log('get', getPostResponse);

  if (getPostResponse.status === 1) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      Single Post page
      {getPostResponse.status === 2 && (
        <>
          <div>{getPostResponse.response.data.title}</div>
          <div>
            <Dangerous data={getPostResponse.response.data.body} />
          </div>
          <div>{getPostResponse.response.data.author.username}</div>
          {getPostResponse.response.data.author.id === current_user.id && (
            <Link to={`/posts/${getPostResponse.response.data.id}/edit`}>Edit Post</Link>
          )}
        </>
      )}
    </div>
  );
};

SinglePost.propTypes = {};

export default SinglePost;
