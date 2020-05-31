import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { UserContext, AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link } from 'react-router-dom';
import Dangerous from '../components/Dangerous';

const Home = props => {
  const {
    auth: { current_user, token, expires },
  } = useContext(AuthContext);
  const { response: getPostResponse, request: getPosts } = useAxios({
    method: 'get',
    url: `/posts`,
  });

  useEffect(() => {
    const fetchData = async () => {
      if (getPostResponse.status === 0) {
        await getPosts();
      }
    };

    fetchData();
  }, [getPosts, getPostResponse]);
  console.log(getPostResponse);
  const is_anonymous = !current_user || !token || new Date(expires).getTime() <= Date.now();


  return (
    <div>
      General and User Home - has all user posts - on current_user posts can edit - maybe merge this
      with Home page
      {getPostResponse.status === 2 &&
        getPostResponse.response.data.items.map(item => (
          <>
            <div>{item.title}</div>
            <div>
              <Dangerous data={item.body} />
            </div>
            <div>
              <Link to={`/users/${item.author.id}`}>{item.author.username}</Link>
            </div>
            {!is_anonymous && item.author.id === current_user.id && (
              <div>
                <Link to={`/posts/${item.id}/edit`}>Edit Post</Link>
              </div>
            )}
          </>
        ))}
      <div>
        <Link to={`/posts/add`}>Create Your Own Post</Link>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
