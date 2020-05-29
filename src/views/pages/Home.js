import React, { useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { UserContext, AuthContext } from 'views/components/App';
import { useAxios } from 'state/hooks/useAxios';

import { useHistory, Link } from 'react-router-dom';

const Home = props => {
  const {
    auth: { current_user },
  } = useContext(AuthContext);
  const { response: getPostResponse, request: getPosts } = useAxios({
    method: 'get',
    url: `/posts`,
  });
  useEffect(() => {}, [getPosts]);

  useEffect(() => {
    const fetchData = async () => {
      if (getPostResponse.status === 0) {
        await getPosts();
      }
    };

    fetchData();
  }, [getPosts, getPostResponse]);
  console.log(getPostResponse);

  return (
    <div>
      General and User Home - has all user posts - on current_user posts can edit - maybe merge this
      with Home page
      {getPostResponse.status === 2 &&
        getPostResponse.response.data.items.map(item => (
          <>
            <div>{item.title}</div>
            <div>{item.body}</div>
            <div>{item.author.username}</div>
          </>
        ))}
    </div>
  );
};

Home.propTypes = {};

export default Home;
